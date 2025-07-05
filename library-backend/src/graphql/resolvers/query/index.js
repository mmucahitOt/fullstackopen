const bookQueries = require("./book-query.resolver");
const authorQueries = require("./author-query.resolver");
const userQueries = require("./user-query.resolver");

module.exports = {
  ...bookQueries,
  ...authorQueries,
  ...userQueries,
};
