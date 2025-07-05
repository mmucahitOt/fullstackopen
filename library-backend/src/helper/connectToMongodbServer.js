const mongoose = require("mongoose");
const { mongoUri } = require("../services/configs.service");

const connectToMongodbServer = async () => {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
};

module.exports = connectToMongodbServer;
