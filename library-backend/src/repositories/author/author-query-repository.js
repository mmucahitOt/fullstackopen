const Author = require("../../entities/author.entity");

const authorQueryRepository = {
  findAllAuthors: async () => {
    const pipeline = [
      {
        $lookup: {
          from: "books",
          let: {
            authorId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$author", "$$authorId"],
                },
              },
            },
            {
              $group: {
                _id: null,
                bookCount: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                bookCount: 1,
              },
            },
          ],
          as: "result",
        },
      },
      { $unwind: "$result" },
      {
        $project: {
          _id: 1,
          name: 1,
          born: 1,
          bookCount: {
            $cond: {
              if: { $eq: ["$result", null] },
              then: 0,
              else: "$result.bookCount",
            },
          },
        },
      },
    ];
    const authors = await Author.aggregate(pipeline);
    return authors;
  },
  getAuthorCount: async () => {
    return await Author.collection.countDocuments();
  },
};

module.exports = authorQueryRepository;
