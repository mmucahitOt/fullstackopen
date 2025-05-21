const Person = require("../models/person.model");

const getAll = () => {
  return Person.find({});
};

const getById = (id) => {
  return Person.findById(id);
};

const deletePerson = (id) => {
  return Person.findByIdAndDelete(id);
};

const addPerson = ({ name, number }) => {
  const person = new Person({ name, number });
  return person.save();
};

const updatePerson = (id, { name, number }) => {
  return Person.findByIdAndUpdate(id, { name, number }, { new: true });
};

const nameExists = (name) => {
  return Person.findOne({ name });
};

const idExists = (id) => {
  return Person.findById(id);
};

module.exports = {
  getAll,
  getById,
  deletePerson,
  addPerson,
  updatePerson,
  nameExists,
  idExists,
};
