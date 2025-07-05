const bookMutationRepository = require("../../../repositories/book/book-mutation-repository");
const { bookTitleTooShortError } = require("../../errors");
const { validateIfUserIsAuthenticated } = require("../../validation/user.validator");

const bookMutations = {
  addBook: async (root, args, context) => {
    validateIfUserIsAuthenticated(context);
    if (args.title.length < 5) {
      throw bookTitleTooShortError;
    }
    const book = await bookMutationRepository.addBook(args);
    return book;
  },
};

module.exports = bookMutations;
