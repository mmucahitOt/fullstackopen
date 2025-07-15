export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface PatientDetails extends Patient {
  ssn: string;
  occupation: string;
}

export interface Entry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes: string[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
