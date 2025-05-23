const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Blog = require("../../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    _id: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422aa71b54a676234d17f8"),
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422b3a1b54a676234d17f9"),
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422b891b54a676234d17fa"),
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422ba71b54a676234d17fb"),
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422bc61b54a676234d17fc"),
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("tests for blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  after(async () => {
    await mongoose.connection.close();
    console.log("mongoose connection closed");
  });

  describe("test get /api/blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body.length, initialBlogs.length);
    });
  });

  describe("test if '_id' is generated", () => {
    test("if '_id' is generated", async () => {
      const response = await api.get("/api/blogs");
      const blog = response.body[0];

      assert.strictEqual(blog._id.toString().length, 24);
    });
  });

  describe("test post /api/blogs", () => {
    test("a valid blog can be added", async () => {
      const id = new mongoose.Types.ObjectId();
      const newBlog = {
        _id: id,
        title: "Test Blog",
        author: "Test Author",
        url: "https://test.com",
        likes: 0,
      };

      const response = await api.post("/api/blogs").send(newBlog).expect(201);
      const createdBlog = response.body;

      assert.strictEqual(createdBlog._id.toString(), id.toString());
      assert.strictEqual(createdBlog.title, "Test Blog");
      assert.strictEqual(createdBlog.author, "Test Author");
      assert.strictEqual(createdBlog.url, "https://test.com");
      assert.strictEqual(createdBlog.likes, 0);
    });

    test("default value of 'likes' is 0", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Test Author",
        url: "https://test.com",
      };

      const response = await api.post("/api/blogs").send(newBlog).expect(201);
      const createdBlog = response.body;

      assert.strictEqual(createdBlog.likes, 0);
    });
  });
});
