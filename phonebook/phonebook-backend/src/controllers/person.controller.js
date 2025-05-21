const personService = require("../services/person-service");

const getAllPersons = (request, response, next) => {
  personService
    .getAll()
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
};

const getOneById = (request, response, next) => {
  const id = request.params.id;
  personService
    .getById(id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
};

const createPerson = (request, response, next) => {
  const body = request.body;
  personService
    .addPerson({
      name: body.name,
      number: body.number,
    })
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
};

const updatePerson = (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  personService
    .updatePerson(id, body)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
};

const deletePerson = (request, response, next) => {
  const id = request.params.id;
  personService
    .deletePerson(id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getAllPersons,
  getOneById,
  createPerson,
  updatePerson,
  deletePerson,
};
