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
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export interface PatientDetails extends Patient {
  ssn: string;
  occupation: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
export enum HealthCheckRating {
  "healthy" = 0,
  "lowRisk" = 1,
  "highRisk" = 2,
  "criticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.healthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.occupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export enum EntryType {
  hospital = "Hospital",
  occupationalHealthcare = "OccupationalHealthcare",
  healthCheck = "HealthCheck",
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

export type OccupationalHealthcareEntryFormValues = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export type EntryFormValues =
  | HealthCheckEntryFormValues
  | OccupationalHealthcareEntryFormValues
  | HospitalEntryFormValues;

export type ValidationError = {
  origin: string;
  code: string;
  minimum: number;
  inclusive: boolean;
  path: string[];
  message: string;
};
