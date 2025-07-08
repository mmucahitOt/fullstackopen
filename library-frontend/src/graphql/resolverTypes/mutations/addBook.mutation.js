import { gql } from "@apollo/client";

const addBook = {
  query: gql`
    mutation addBook(
      $title: String!
      $authorId: String!
      $published: Int!
      $genres: [String!]!
    ) {
      addBook(
        title: $title
        authorId: $authorId
        published: $published
        genres: $genres
      ) {
        _id
        title
      }
    }
  `,
};

export default addBook;
