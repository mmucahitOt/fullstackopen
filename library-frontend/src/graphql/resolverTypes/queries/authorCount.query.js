import { gql } from "@apollo/client";

const authorCount = {
  query: gql`
    query {
      authorCount
    }
  `,
};

export default authorCount;
