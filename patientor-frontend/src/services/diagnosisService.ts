import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

export const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export const getDiagnosisCodes = async () => {
  const { data } = await axios.get<string[]>(`${apiBaseUrl}/diagnoses/codes`);
  return data;
};

