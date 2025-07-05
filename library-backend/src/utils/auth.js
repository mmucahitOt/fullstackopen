const { GraphQLError } = require("graphql");

const getCurrentUser = (context) => {
  if (!context.currentUser) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return context.currentUser;
};

const requireAuth = (context) => {
  return getCurrentUser(context);
};

module.exports = {
  getCurrentUser,
  requireAuth,
};
