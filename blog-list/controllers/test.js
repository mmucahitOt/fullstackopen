const User = require("../models/user");
const Blog = require("../models/blog");
const testRouter = require("express").Router();
const bcrypt = require("bcrypt");

testRouter.post("/create-user", async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  await user.save();
  response.json(user);
});

testRouter.post("/reset-database", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.json({ message: "Database reset" });
});

module.exports = testRouter;