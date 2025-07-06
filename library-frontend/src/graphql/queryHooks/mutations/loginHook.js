import { useMutation } from "@apollo/client";
import { allAuthors, allBooks, login as loginQuery } from "../../resolverTypes";

const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(loginQuery.query, {
    refetchQueries: [{ query: allBooks.query }, { query: allAuthors.query }],
  });

  return { login, data, loading, error };
};

export default useLogin;
