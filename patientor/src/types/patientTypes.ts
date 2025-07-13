export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export interface PatientCreateInput {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientListItemResult = Omit<Patient, "ssn">;

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}