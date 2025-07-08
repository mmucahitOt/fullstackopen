import { gql } from "@apollo/client";

const bookAddedSubscription = {
  query: gql`
    subscription {
      bookAdded {
        _id
        title
        published
        author {
          _id
        }
        genres
      }
    }
  `,
};

export default bookAddedSubscription;
