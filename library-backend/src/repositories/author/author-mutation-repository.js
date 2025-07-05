const Author = require("../../entities/author.entity");

const authorMutationRepository = {
  editAuthor: async ({ name, setBornTo }) => {
    return await Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true });
  },
};

module.exports = authorMutationRepository;
