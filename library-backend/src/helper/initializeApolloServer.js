const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("../graphql/types/index");
const mutationResolvers = require("../graphql/resolvers/mutation");
const queryResolvers = require("../graphql/resolvers/query");
const jwtTokenService = require("../services/jwt-token.service");
const { port } = require("../services/configs.service");

const initializeApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const token = auth.substring(7);
        const decodedToken = jwtTokenService.decodeToken(token);
        const currentUser = {
          _id: decodedToken._id,
          username: decodedToken.username,
        };
        return { currentUser };
      }
      return {};
    },
  });
  console.log(`Apollo Server is running on port ${port}`);
  return url;
};

module.exports = initializeApolloServer;
