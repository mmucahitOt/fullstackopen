const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const Blog = require("../../models/blog");
const User = require("../../models/user");

const initialUser = {
  _id: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
  username: "testuserfortests",
  name: "Test User For Tests",
  password: "testpasswordfortests",
};

const initialBlogs = [
  {
    _id: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422aa71b54a676234d17f8"),
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422b3a1b54a676234d17f9"),
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422b891b54a676234d17fa"),
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422ba71b54a676234d17fb"),
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422bc61b54a676234d17fc"),
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("5a422bc61b54a676234d17fc"),
    title: "Test Blog",
    author: "Test Author",
    url: "https://test.com",
    likes: 2,
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f7"),
    __v: 0,
  },
];

const seedUsers = async () => {
  const blogObjectIds = initialBlogs.map((blog) => blog._id);
  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  await User.insertMany({
    _id: initialUser._id,
    username: initialUser.username,
    name: initialUser.name,
    passwordHash: passwordHash,
    blogs: blogObjectIds,
  });
};

const seedBlogs = async () => {
  await Blog.insertMany(initialBlogs);
};

const resetDatabase = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
};

const initializeDatabase = async () => {
  await resetDatabase();
  await seedUsers();
  await seedBlogs();
};

module.exports = {
  resetDatabase,
  initializeDatabase,
  initialUser,
  initialBlogs,
};
