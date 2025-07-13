import { Diagnosis, DiagnosisCreateInput } from "../types/diagnoseTypes";
import { diagnoses } from "../data";

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export const createDiagnosis = (diagnosis: DiagnosisCreateInput): Diagnosis => {
  diagnoses.push(diagnosis);
  return diagnosis;
};
