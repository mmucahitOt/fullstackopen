import { Entry } from "./entryTypes";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface PatientCreateInput {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
