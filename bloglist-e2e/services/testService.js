const axios = require("axios");

const resetDatabase = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/testing/reset-database"
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting database:", error);
    throw error;
  }
};

const createUser = async ({ username, name, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/testing/create-user",
      {
        username,
        name,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

module.exports = { resetDatabase, createUser };
