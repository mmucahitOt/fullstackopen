import {
  Patient,
  PatientCreateInput,
  PatientListItemResult,
} from "../types/patientTypes";
import { patients } from "../data";
import { v4 as uuidv4 } from "uuid";

export const getPatients = (): PatientListItemResult[] => {
  return patients.map(({ id, dateOfBirth, gender, name, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

export const createPatient = (patient: PatientCreateInput): Patient => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
  };
  patients.push(newPatient);
  return newPatient;
};
