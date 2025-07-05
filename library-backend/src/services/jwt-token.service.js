const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./configs.service");

const jwtTokenService = {
  generateToken: (user) => {
    return jwt.sign({ _id: user._id, username: user.username }, jwtSecret);
  },
  decodeToken: (token) => {
    return jwt.verify(token, jwtSecret);
  },
};

module.exports = jwtTokenService;
