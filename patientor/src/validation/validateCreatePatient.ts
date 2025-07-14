import { NextFunction, Request, Response } from "express";
import { Gender } from "../types/patientTypes";
import z, { ZodError } from "zod";

export const validateCreatePatientMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreatePatientValidationSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: error instanceof ZodError ? error.message : "Invalid request body",
    });
  }
};

const CreatePatientValidationSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
});

export default validateCreatePatientMiddleware;
