const User = require("../../entities/user.entity");

const userQueryRepository = {
  getById: async ({ _id }) => {
    console.log("getById", _id);
    const user = await User.findById(_id);
    console.log("user", user);
    return user;
  },
  getByUsername: async ({ username }) => {
    const user = await User.findOne({ username });
    return user;
  },
};

module.exports = userQueryRepository;
