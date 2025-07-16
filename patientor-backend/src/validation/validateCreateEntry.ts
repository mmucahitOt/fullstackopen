import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { EntryType, HealthCheckRating } from "../types/entryTypes";
import { Diagnosis } from "../types/diagnoseTypes";
import { diagnoses } from "../data";

export const validateCreateEntryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: unknown = req.body;

    if (typeof body !== "object" || body === null || !("type" in body)) {
      throw new Error("Type is required");
    }
    if (body.type === EntryType.healthCheck) {
      CreateHealthCheckEntryValidationSchema.parse(body);
    } else if (body.type === EntryType.occupationalHealthcare) {
      CreateOccupationalHealthcareEntryValidationSchema.parse(body);
    } else if (body.type === EntryType.hospital) {
      CreateHospitalEntryValidationSchema.parse(body);
    }
    next();
  } catch (error) {
    res
      .status(400)
      .json(error instanceof ZodError ? error.message : "Invalid request body");
  }
};

const CreateHealthCheckEntryValidationSchema = z.object({
  description: z.string().min(1),
  date: z.string().date(),
  specialist: z.string().min(1),
  type: z.enum(EntryType),
  diagnosisCodes: z.custom<Diagnosis["code"][]>((data) => {
    const diagnosisCodes = data as Diagnosis["code"][];
    const validDiagnosisCodes = diagnosisCodes.every((code) =>
      Object.values(diagnoses).some((diagnosis) => diagnosis.code === code)
    );
    return validDiagnosisCodes;
  }),
  healthCheckRating: z.enum(HealthCheckRating),
});

const CreateOccupationalHealthcareEntryValidationSchema = z.object({
  description: z.string().min(1),
  date: z.string().date(),
  specialist: z.string().min(1),
  type: z.enum(EntryType),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const CreateHospitalEntryValidationSchema = z.object({
  description: z.string().min(1),
  date: z.string().date(),
  specialist: z.string().min(1),
  type: z.enum(EntryType),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string().min(1),
  }),
});

export default validateCreateEntryMiddleware;
