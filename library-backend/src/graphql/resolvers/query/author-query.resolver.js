const authorQueryRepository = require("../../../repositories/author/author-query-repository");
const { validateIfUserIsAuthenticated } = require("../../validation/user.validator");

const authorQueries = {
  allAuthors: async (root, args, context) => {
    validateIfUserIsAuthenticated(context);
    return await authorQueryRepository.findAllAuthors();
  },
  authorCount: async (root, args, context) => {
    validateIfUserIsAuthenticated(context);
    return await authorQueryRepository.getAuthorCount();
  },
};

module.exports = authorQueries;
