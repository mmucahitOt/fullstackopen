import { ValidationError } from "./validationError";

export interface ResponseBody<T> {
  data?: T;
  error?: ValidationError;
}
