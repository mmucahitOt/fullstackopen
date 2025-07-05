import { gql } from "@apollo/client";

const allBooks = {
  query: gql`
    query allBooks($authorName: String, $genre: String) {
      allBooks(authorName: $authorName, genre: $genre) {
        _id
        title
        author {
          name
        }
        published
        genres
      }
    }
  `,
};

export default allBooks;
