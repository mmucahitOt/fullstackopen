const bookMutations = require("./book-mutation.resolver");
const authorMutations = require("./author-mutation.resolver");
const userMutations = require("./user-mutation.resolver");

module.exports = {
  ...bookMutations,
  ...authorMutations,
  ...userMutations,
};
