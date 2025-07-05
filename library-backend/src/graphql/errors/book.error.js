const { GraphQLError } = require("graphql");

const bookNotFoundError = new GraphQLError("Book not found", {
  extensions: {
    code: "NOT_FOUND",
  },
});

const bookTitleTooShortError = new GraphQLError("Book title is too short", {
  extensions: {
    code: "BAD_USER_INPUT",
  },
});

module.exports = {
  bookNotFoundError,
  bookTitleTooShortError,
};