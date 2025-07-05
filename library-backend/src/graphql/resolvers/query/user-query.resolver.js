const userQueryRepository = require("../../../repositories/user/user-query-repository");
const {
  validateIfUserIsAuthenticated,
} = require("../../validation/user.validator");

const userQueries = {
  me: async (root, args, context) => {
    validateIfUserIsAuthenticated(context);
    const user = await userQueryRepository.getById({
      _id: context.currentUser._id,
    });
    return user;
  },
};

module.exports = userQueries;
