import { Gender } from "../types/patientTypes";

export const isString = (text: unknown): boolean => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: unknown): boolean => {
  return isString(date) && Boolean(Date.parse(date as string));
};

export const isGender = (gender: unknown): boolean => {
  return Object.values(Gender).includes(gender as Gender);
};
