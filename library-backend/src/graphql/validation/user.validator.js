const { notAuthenticatedError } = require("../errors");

const validateIfUserIsAuthenticated = (context) => {
  if (!context.currentUser) {
    throw notAuthenticatedError;
  }
};

module.exports = {
  validateIfUserIsAuthenticated,
};
