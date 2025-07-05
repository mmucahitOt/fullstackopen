import { gql } from "@apollo/client";

const allAuthors = {
  query: gql`
    query {
      allAuthors {
        _id
        name
        born
        bookCount
      }
    }
  `,
};

export default allAuthors;
