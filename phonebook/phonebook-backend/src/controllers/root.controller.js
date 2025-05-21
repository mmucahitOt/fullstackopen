const getRoot = (request, response) => {
  response.send("<h1>Hello World</h1>");
};

module.exports = { getRoot };
