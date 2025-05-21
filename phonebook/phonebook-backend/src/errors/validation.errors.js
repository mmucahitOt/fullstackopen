// validation errors

const nameMissing = {
  name: "nameMissing",
  message: "\"name\" is required",
  code: 400,
};

const nameTooShort = {
  name: "nameTooShort",
  message: "\"name\" must be at least 3 characters long",
  code: 400,
};

const numberMissing = {
  name: "numberMissing",
  message: "\"number\" is required",
  code: 400,
};

const numberInvalid = {
  name: "numberInvalid",
  message: "Invalid phone number",
  code: 400,
};

const nameMustBeUnique = {
  name: "nameMustBeUnique",
  message: "\"name\" must be unique",
  code: 400,
};

const personNotFound = {
  name: "personNotFound",
  message: "person not found",
  code: 404,
};

const personAlreadyExists = {
  name: "personAlreadyExists",
  message: "person already exists",
  code: 400,
};

const personNotExists = {
  name: "personNotExists",
  message: "person not exists",
  code: 404,
};

module.exports = {
  nameMissing,
  nameTooShort,
  numberMissing,
  numberInvalid,
  nameMustBeUnique,
  personNotFound,
  personAlreadyExists,
  personNotExists,
};
