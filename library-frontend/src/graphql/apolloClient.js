import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import localStorageService from "../services/local-storage.service";

const authLink = setContext((_, { headers }) => {
  const token = localStorageService.getToken();
  console.log("token", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

// Function to reset Apollo Client cache and refetch queries after login
export const resetApolloClient = () => {
  apolloClient.resetStore();
};
