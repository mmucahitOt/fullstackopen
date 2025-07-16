import { patients } from "../data";
import { Entry, EntryCreateInput } from "../types/entryTypes";
import { v4 as uuidv4 } from "uuid";

const createEntry = (params: {
  patientId: string;
  entryInput: EntryCreateInput;
}) => {
  const patient = patients.find((patient) => patient.id === params.patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntry: Entry = {
    ...params.entryInput,
    id: uuidv4(),
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export { createEntry };
