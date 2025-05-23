const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
