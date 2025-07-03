import { gql } from "@apollo/client";

const addBook = {
  query: gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
      addBook(title: $title, author: $author, published: $published, genres: $genres) {
        title
        author
      }
    }
  `,
};

export default addBook;
