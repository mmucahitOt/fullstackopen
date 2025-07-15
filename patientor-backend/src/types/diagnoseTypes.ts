export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnosisCreateInput {
  code: string;
  name: string;
  latin?: string;
}
