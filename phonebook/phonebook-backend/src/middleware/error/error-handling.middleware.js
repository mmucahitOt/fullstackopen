const { castError } = require("../../errors/errors");

const errorHandler = (error, request, response) => {
  // db lvl error handling
  if (error.kind === castError.kind) {
    return response.status(castError.code).send({ error: castError.message });
  }

  // validation error handling
  return response.status(error.code).send({ error: error.message });
};

module.exports = errorHandler;
