import axios from "axios";
import { Patient, PatientDetails, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

export const getById = async (id: string) => {
  const { data } = await axios.get<PatientDetails>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

export const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};
