import { Entry, EntryFormValues } from "../types";
import axios, { AxiosResponse } from "axios";
import { apiBaseUrl } from "../constants";

export const createEntry = async (params: {
  patientId: string;
  entryInput: EntryFormValues;
}) => {
  const response = await axios.post<EntryFormValues, AxiosResponse<Entry>>(
    `${apiBaseUrl}/patients/${params.patientId}/entries`,
    params.entryInput
  );
  return response.data;
};
