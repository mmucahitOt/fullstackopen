const User = require("../../entities/user.entity");

const userMutationRepository = {
  createUser: async ({ username, favoriteGenre, hashedPassword }) => {
    const user = new User({
      username,
      favoriteGenre,
      password: hashedPassword,
    });
    await user.save();
    return user;
  },
};

module.exports = userMutationRepository;
