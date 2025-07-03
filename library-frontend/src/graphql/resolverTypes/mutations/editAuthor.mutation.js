import { gql } from "@apollo/client";

const editAuthor = {
  query: gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
      }
    }
  `,
};

export default editAuthor;