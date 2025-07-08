const book = `
  type Book {
    _id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type AllBooksResultItem {
    _id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type AddBookResult {
    _id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Subscription {
    bookAdded: AddBookResult!
  }

  type Query {
    genres: [String!]!
    bookCount: Int!
    allBooks(authorName: String, genre: String): [AllBooksResultItem!]
  }

  type Mutation {
    addBook(
      title: String!
      authorId: String!
      published: Int!
      genres: [String!]!
    ): AddBookResult
  }
`;

module.exports = book;
