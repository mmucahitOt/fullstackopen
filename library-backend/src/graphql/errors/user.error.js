const { GraphQLError } = require("graphql");

const notAuthenticatedError = new GraphQLError("not authenticated", {
  extensions: {
    code: "BAD_USER_INPUT",
  },
});

const invalidPasswordError = new GraphQLError("Invalid password", {
  extensions: {
    code: "BAD_USER_INPUT",
  },
});

module.exports = {
  notAuthenticatedError,
};
