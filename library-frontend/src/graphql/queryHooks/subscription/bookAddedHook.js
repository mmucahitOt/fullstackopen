import { useSubscription } from "@apollo/client";
import bookAddedSubscription from "../../resolverTypes/subscription/book-added.subscription";
import { useContext } from "react";
import { NotificationContext } from "../../../provider/notification-context-provider";

const useBookAdded = () => {
  const { handleNotification } = useContext(NotificationContext);
  const { data } = useSubscription(bookAddedSubscription.query, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      handleNotification({ message: addedBook.title, type: "success" });

      client.cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            return [...existingBooks, addedBook];
          },
          bookCount(existingCount = 0) {
            return existingCount + 1;
          },
        },
      });
    },
  });
  return data;
};

export default useBookAdded;
