const pubsub = require("../../pubsub");

const bookSubscription = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
  },
};

module.exports = { bookSubscription };
