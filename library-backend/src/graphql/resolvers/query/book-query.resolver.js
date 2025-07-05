const bookQueryRepository = require("../../../repositories/book/book-query-repository");
const {
  validateIfUserIsAuthenticated,
} = require("../../validation/user.validator");

const bookQueries = {
  allBooks: async (root, args, context) => {
    validateIfUserIsAuthenticated(context);
    const filter = {};
    if (args.authorName) {
      filter["author.name"] = args.authorName;
    }
    if (args.genre) {
      filter["genres"] = { $in: [args.genre] };
    }
    const books = await bookQueryRepository.findAllBooks(filter);
    return books;
  },
  bookCount: async (root, args, context) => {
    validateIfUserIsAuthenticated(context);
    return await bookQueryRepository.getBookCount();
  },
};

module.exports = bookQueries;
