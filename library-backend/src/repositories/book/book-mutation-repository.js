const Book = require("../../entities/book.entity");
const mongoose = require("mongoose");

const bookMutationRepository = {
  addBook: async ({ title, authorId, published, genres }) => {
    const book = new Book({
      title,
      author: new mongoose.Types.ObjectId(authorId),
      published,
      genres,
    });
    await book.save();
    return book;
  },
};

module.exports = bookMutationRepository;
