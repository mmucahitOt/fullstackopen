const authorMutationRepository = require("../../../repositories/author/author-mutation-repository");
const { authorNameTooShortError } = require("../../errors");
const { validateIfUserIsAuthenticated } = require("../../validation/user.validator");

const authorMutations = {
  editAuthor: async (root, args) => {
    validateIfUserIsAuthenticated(context);
    if (args.name.length < 4) {
      throw authorNameTooShortError;
    }
    const author = await authorMutationRepository.editAuthor(args);
    console.log(author);
    return author;
  },
};

module.exports = authorMutations;
