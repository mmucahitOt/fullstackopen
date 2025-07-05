const { default: mongoose } = require("mongoose");
const Author = require("../entities/author.entity");
const Book = require("../entities/book.entity");
const User = require("../entities/user.entity");
const hashService = require("../services/hash.service");

let admin = {
  _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a0"),
  username: "admin",
  password: "admin",
  favoriteGenre: "agile",
};

let authors = [
  {
    name: "Robert Martin",
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a1"),
    born: 1952,
    createdBy: admin._id,
  },
  {
    name: "Martin Fowler",
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a2"),
    born: 1963,
    createdBy: admin._id,
  },
  {
    name: "Fyodor Dostoevsky",
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a3"),
    born: 1821,
    createdBy: admin._id,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a4"),
    createdBy: admin._id,
  },
  {
    name: "Sandi Metz", // birthyear not known
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a5"),
    createdBy: admin._id,
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: authors[0]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a6"),
    genres: ["refactoring"],
    createdBy: admin._id,
  },
  {
    title: "Agile software development",
    published: 2002,
    author: authors[0]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a7"),
    genres: ["agile", "patterns", "design"],
    createdBy: admin._id,
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: authors[1]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a8"),
    genres: ["refactoring"],
    createdBy: admin._id,
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: authors[2]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223a9"),
    genres: ["refactoring", "patterns"],
    createdBy: admin._id,
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: authors[3]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223b0"),
    genres: ["refactoring", "design"],
    createdBy: admin._id,
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: authors[2]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223b1"),
    genres: ["classic", "crime"],
    createdBy: admin._id,
  },
  {
    title: "Demons",
    published: 1872,
    author: authors[2]._id,
    _id: new mongoose.Types.ObjectId("6868e8a1445700a0728223b2"),
    genres: ["classic", "revolution"],
    createdBy: admin._id,
  },
];

const feedData = async () => {
  await User.deleteMany({});
  await Author.deleteMany({});
  await Book.deleteMany({});

  const hashedPassword = await hashService.hashPassword(admin.password);
  await User.create({
    ...admin,
    password: hashedPassword,
  });
  await Author.insertMany(authors);
  await Book.insertMany(books);
  console.log("Data feeded");
};

module.exports = feedData;
