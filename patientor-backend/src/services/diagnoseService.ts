import { Diagnosis, DiagnosisCreateInput } from "../types/diagnoseTypes";
import { diagnoses } from "../data";

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
export const getDiagnosisCodes = (): string[] => {
  return diagnoses.map((diagnosis) => diagnosis.code);
};
export const createDiagnosis = (diagnosis: DiagnosisCreateInput): Diagnosis => {
  diagnoses.push(diagnosis);
  return diagnosis;
};
