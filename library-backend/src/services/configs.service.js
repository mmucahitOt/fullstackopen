const dotenv = require("dotenv");

dotenv.config();

const configs = {
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/library",
};

module.exports = configs;
