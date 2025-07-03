import { gql } from "@apollo/client";

const allAuthors = {
  query: gql`
    query {
      allAuthors {
        author
        born
        bookCount
      }
    }
  `,
};

export default allAuthors;
