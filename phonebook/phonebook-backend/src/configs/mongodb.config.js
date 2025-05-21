const mongoose = require("mongoose");

const connectToDatabase = (uri) => {
  mongoose.set("strictQuery", false);

  const url = uri || process.env.MONGODB_URI;
  console.log("connecting to", url);

  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
};

module.exports = { connectToDatabase };
