const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./configs.service");

const hashService = {
  hashPassword: async (password) => {
    return await bcrypt.hash(password, Number(SALT_ROUNDS));
  },
  comparePassword: async ({ password, hashedPassword }) => {
    console.log("password", password);
    console.log("hashedPassword", hashedPassword);
    return await bcrypt.compare(password, hashedPassword);
  },
};

module.exports = hashService;
