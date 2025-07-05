const { GraphQLError } = require("graphql");

const authorNotFoundError = new GraphQLError("Author not found", {
  extensions: {
    code: "NOT_FOUND",
  },
});

const authorAlreadyExistsError = new GraphQLError("Author already exists", {
  extensions: {
    code: "BAD_USER_INPUT",
  },
});

const authorNameTooShortError = new GraphQLError("Author name is too short", {
  extensions: {
    code: "BAD_USER_INPUT",
  },
});


module.exports = {
  authorNotFoundError,
  authorAlreadyExistsError,
  authorNameTooShortError,
};