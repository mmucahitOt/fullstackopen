const feedData = require("./data/feedData");
const connectToMongodbServer = require("./helper/connectToMongodbServer");
const initializeApolloServer = require("./helper/initializeApolloServer");

const startServer = async () => {
  await connectToMongodbServer();
  await feedData();
  await initializeApolloServer();
};

startServer();
