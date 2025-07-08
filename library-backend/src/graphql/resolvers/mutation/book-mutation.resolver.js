const bookMutationRepository = require("../../../repositories/book/book-mutation-repository");
const pubsub = require("../../pubsub");
const { bookTitleTooShortError } = require("../../errors");
const {
  validateIfUserIsAuthenticated,
} = require("../../validation/user.validator");

const bookMutations = {
  addBook: async (root, args, context) => {
    console.log("args", args);
    console.log("context", context);
    validateIfUserIsAuthenticated(context);
    if (args.title.length < 5) {
      throw bookTitleTooShortError;
    }
    const book = await bookMutationRepository.addBook({
      ...args,
      createdById: context.currentUser._id,
    });
    console.log("book", book);
    pubsub.publish("BOOK_ADDED", { bookAdded: book });
    return book;
  },
};

module.exports = bookMutations;
