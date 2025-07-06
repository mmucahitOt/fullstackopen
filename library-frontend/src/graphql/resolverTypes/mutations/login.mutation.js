import { gql } from "@apollo/client";

const login = {
  query: gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
  `,
};

export default login;