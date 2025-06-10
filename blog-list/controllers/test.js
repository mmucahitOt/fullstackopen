const User = require("../models/user");
const Blog = require("../models/blog");
const testRouter = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

testRouter.post("/create-user", async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  await user.save();
  response.json(user);
});

testRouter.post("/create-blog", async (request, response) => {
  const { title, author, url, userId } = request.body;
  const blog = new Blog({
    title,
    author,
    url,
    user: new mongoose.Types.ObjectId(userId),
  });
  await blog.save();
  response.json(blog);
});

testRouter.post("/reset-database", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.json({ message: "Database reset" });
});

module.exports = testRouter;
