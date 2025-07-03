import { gql } from "@apollo/client";

const bookCount = {
  query: gql`
    query {
      bookCount
    }
  `,
};

export default bookCount;
