const authorError = require("./author.error");
const bookError = require("./book.error");
const userError = require("./user.error");

module.exports = {
  ...authorError,
  ...bookError,
  ...userError,
};
