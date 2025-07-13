import { Gender, PatientCreateInput } from "../types/patientTypes";
import { isString, isDate, isGender } from "./common";

const transformCreatePatient = (params: unknown): PatientCreateInput => {
  if (!params || typeof params !== "object") {
    throw new Error("Invalid params");
  }

  if (
    !(
      "name" in params &&
      "dateOfBirth" in params &&
      "ssn" in params &&
      "gender" in params &&
      "occupation" in params
    )
  ) {
    throw new Error("Invalid params");
  }

  return {
    name: parseName(params.name),
    dateOfBirth: parseDateOfBirth(params.dateOfBirth),
    ssn: parseSsn(params.ssn),
    gender: parseGender(params.gender),
    occupation: parseOccupation(params.occupation),
  };
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Invalid name");
  }
  return name as string;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isDate(dateOfBirth)) {
    throw new Error("Invalid date of birth");
  }
  return dateOfBirth as string;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Invalid ssn");
  }
  return ssn as string;
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error("Invalid gender");
  }
  return gender as Gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Invalid occupation");
  }
  return occupation as string;
};

export default transformCreatePatient;
