const morgan = require("morgan");

const setupMorganLogging = (app) => {
  morgan.token("body", (req) => JSON.stringify(req.body));
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :body"
    )
  );
};

module.exports = { setupMorganLogging };
