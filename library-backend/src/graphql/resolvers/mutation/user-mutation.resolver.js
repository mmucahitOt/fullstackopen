const userMutationRepository = require("../../../repositories/user/user-mutation-repository");
const hashService = require("../../../services/hash.service");
const userQueryRepository = require("../../../repositories/user/user-query-repository");
const { invalidPasswordError } = require("../../errors");
const jwtTokenService = require("../../../services/jwt-token.service");

const userMutations = {
  createUser: async (root, args) => {
    if (args.username.length < 4) {
      throw userUsernameTooShortError;
    }
    const password = args.username; // TODO: change this to a random password
    const hashedPassword = await hashService.hashPassword(password);
    const user = await userMutationRepository.createUser({
      ...args,
      hashedPassword: hashedPassword,
    });
    return user;
  },
  login: async (root, args) => {
    console.log("args", args);
    const user = await userQueryRepository.getByUsername({
      username: args.username,
    });
    const isPasswordValid = await hashService.comparePassword({
      password: args.password,
      hashedPassword: user.password,
    });
    if (!isPasswordValid) {
      throw invalidPasswordError;
    }
    const token = jwtTokenService.generateToken(user);
    return { value: token };
  },
};

module.exports = userMutations;
