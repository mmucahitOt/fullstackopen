const cors = require("cors");
const express = require("express");
const { setupMorganLogging } = require("./common/morgan.middleware");
const errorHandler = require("./error/error-handling.middleware");
const unknownEndpoint = require("./error/unknown-endpoint.middleaware");
const { getRoot } = require("../controllers/root.controller");

/**
 * Sets up the entire middleware pipeline including application middleware, routes, and error handling
 * @param {Express.Application} app - Express application instance
 * @param {Array<{path: string, router: express.Router}>} routes - Array of route objects with path and router
 */
const setupAppMiddleware = (app, routes) => {
  // 1. Common middleware (BEFORE routes)
  app.use(cors());
  app.use(express.json());
  app.use(express.static("dist"));

  // 2. Logging middleware
  setupMorganLogging(app);

  // 3. Mount routes
  app.get("/", getRoot); // Default route
  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });

  // 4. Error handling middleware (AFTER routes)
  app.use(unknownEndpoint); // 404 handler
  app.use(errorHandler); // Global error handler
};

module.exports = { setupAppMiddleware };
