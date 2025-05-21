const personService = require("../services/person-service");

const getInfo = (request, response) => {
  const date = new Date();
  personService.getAll().then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>`
    );
  });
};

module.exports = { getInfo };
