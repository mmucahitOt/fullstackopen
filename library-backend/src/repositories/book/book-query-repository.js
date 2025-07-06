const Book = require("../../entities/book.entity");

const bookQueryRepository = {
  findAllBooks: async (filter) => {
    const pipeline = [
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          ...filter,
        },
      },
    ];
    const books = await Book.aggregate(pipeline);
    return books;
  },

  getBookCount: async () => {
    return await Book.collection.countDocuments();
  },

  getGenres: async () => {
    const pipeline = [
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
        },
      },
      {
        $group: {
          _id: null,
          genres: { $addToSet: "$_id" },
        },
      },
    ];
    const result = await Book.aggregate(pipeline);

    console.log("result", result);

    return result[0].genres;
  },
};

module.exports = bookQueryRepository;
