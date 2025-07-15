import {
  Patient,
  PatientCreateInput,
  NonSensitivePatient,
} from "../types/patientTypes";
import { patients } from "../data";
import { v4 as uuidv4 } from "uuid";

export const getPatients = (): NonSensitivePatient[] => {
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

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export const createPatient = (patient: PatientCreateInput): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: uuidv4(),
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};
