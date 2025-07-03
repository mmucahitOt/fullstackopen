import { gql } from "@apollo/client";

const allBooks = {
  query: gql`
    query allBooks($author: String, $genre: String) {
      allBooks(author: $author, genre: $genre) {
        title
        author
        published
        genres
      }
    }
  `,
};

export default allBooks;
