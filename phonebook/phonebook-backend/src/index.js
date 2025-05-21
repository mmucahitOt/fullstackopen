const express = require("express");
const { connectToDatabase } = require("./configs/mongodb.config");
const { setupAppMiddleware } = require("./middleware");
const dotenv = require("dotenv");

dotenv.config();

// Import routes
const personRoutes = require("./routes/person.routes");
const infoRoutes = require("./routes/info.routes");

// Initialize express app
const app = express();

// Connect to database
const MONGODB_URI = process.env.MONGODB_URI;
connectToDatabase(MONGODB_URI);

// Middleware
setupAppMiddleware(app, [
  { path: "/api/persons", router: personRoutes },
  { path: "/info", router: infoRoutes },
]);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
