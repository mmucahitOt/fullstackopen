const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./configs.service");

const jwtTokenService = {
  generateToken: (user) => {
    return jwt.sign({ _id: user._id, username: user.username }, JWT_SECRET);
  },
  decodeToken: (token) => {
    return jwt.verify(token, JWT_SECRET);
  },
};

module.exports = jwtTokenService;
