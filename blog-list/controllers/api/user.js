const userRouter = require("express").Router();
const User = require("../../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "password must be at least 3 characters long" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;
