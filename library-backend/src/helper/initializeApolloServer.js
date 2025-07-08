const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { PORT } = require("../services/configs.service");
const typeDef = require("../graphql/types");
const jwtTokenService = require("../services/jwt-token.service");
const queryResolvers = require("../graphql/resolvers/query");
const mutationResolvers = require("../graphql/resolvers/mutation");
const subscriptionResolvers = require("../graphql/resolvers/subscription");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");

const initializeApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const schema = makeExecutableSchema({
    typeDefs: typeDef,
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
      Subscription: subscriptionResolvers,
    },
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema: schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
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
    })
  );

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

module.exports = initializeApolloServer;
