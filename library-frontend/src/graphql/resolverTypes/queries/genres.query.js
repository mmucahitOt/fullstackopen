import { gql } from "@apollo/client";

const genres = {
  query: gql`
    query {
      genres
    }
  `,
};

export default genres;
