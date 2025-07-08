const { PubSub } = require("graphql-subscriptions");

// Create a shared PubSub instance
const pubsub = new PubSub();

module.exports = pubsub;
