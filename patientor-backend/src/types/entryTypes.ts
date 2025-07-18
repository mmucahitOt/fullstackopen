import { Diagnosis } from "./diagnoseTypes";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
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

export type HealthCheckEntryCreateInput = Omit<HealthCheckEntry, "id">;

export type OccupationalHealthcareEntryCreateInput = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export type HospitalEntryCreateInput = Omit<HospitalEntry, "id">;

export type EntryCreateInput =
  | HealthCheckEntryCreateInput
  | OccupationalHealthcareEntryCreateInput
  | HospitalEntryCreateInput;
