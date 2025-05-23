const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const userId = decodedToken.id;
    const { title, author, url, likes } = request.body;
    if (!userId) {
      return response.status(400).json({ error: "userId is required" });
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: new mongoose.Types.ObjectId(userId),
    });
    const result = await blog.save();
    const userUpdateResult = await User.findByIdAndUpdate(userId, {
      $push: { blogs: result._id },
    });
    if (!userUpdateResult) {
      return response.status(400).json({ error: "User not found" });
    }
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          title: request.body.title || undefined,
          author: request.body.author || undefined,
          url: request.body.url || undefined,
          likes: request.body.likes || undefined,
        },
      },
      { new: true }
    );
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
