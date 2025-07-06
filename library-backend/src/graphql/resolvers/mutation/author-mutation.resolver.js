const authorMutationRepository = require("../../../repositories/author/author-mutation-repository");
const {
  validateIfUserIsAuthenticated,
} = require("../../validation/user.validator");

const authorMutations = {
  editAuthor: async (root, args, context) => {
    console.log("args", args);
    console.log("context", context);
    validateIfUserIsAuthenticated(context);
    const author = await authorMutationRepository.editAuthor(args);
    console.log(author);
    return author;
  },
};

module.exports = authorMutations;
