const mongoose = require("mongoose");
const { MONGO_URI } = require("../services/configs.service");

const connectToMongodbServer = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
};

module.exports = connectToMongodbServer;
