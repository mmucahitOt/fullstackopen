const dotenv = require("dotenv");

dotenv.config();

const configs = {
  jwtSecret: process.env.JWT_SECRET || "secret",
  saltRounds: process.env.SALT_ROUNDS || 10,
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/library",
};

module.exports = configs;
