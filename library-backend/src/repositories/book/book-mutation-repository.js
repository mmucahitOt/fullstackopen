const Book = require("../../entities/book.entity");
const mongoose = require("mongoose");

const bookMutationRepository = {
  addBook: async ({ title, authorId, published, genres, createdById }) => {
    const book = new Book({
      title,
      author: new mongoose.Types.ObjectId(authorId),
      published,
      genres,
      createdBy: new mongoose.Types.ObjectId(createdById),
    });
    await book.save();
    return book;
  },
};

module.exports = bookMutationRepository;
