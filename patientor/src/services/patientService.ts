import { PatientListItemResult } from "../types/patientTypes";
import { patients } from "../data";

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
