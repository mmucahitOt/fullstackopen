const author = `
  type Author {
    _id: ID!
    name: String!
    born: Int
  }

  type AllAuthorsResultItem {
    _id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type EditAuthorResult {
    name: String!
    born: Int!
  }

  type Query {
    allAuthors: [AllAuthorsResultItem!]
    authorCount: Int!
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): EditAuthorResult
  }
`;

module.exports = author;
