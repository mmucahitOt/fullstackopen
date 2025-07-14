import { Request, Response, Router } from "express";
import { createPatient, getPatients } from "../services/patientService";
import {
  Patient,
  PatientCreateInput,
  PatientListItemResult,
} from "../types/patientTypes";
import { validateCreatePatientMiddleware } from "../validation/validateCreatePatient";

const router = Router();

router.get("/", (_req: Request, res: Response<PatientListItemResult[]>) => {
  res.send(getPatients());
});

router.post(
  "/",
  validateCreatePatientMiddleware,
  (
    req: Request<unknown, unknown, PatientCreateInput>,
    res: Response<Patient>
  ) => {
    const createPatientInput = req.body;
    const patient = createPatient(createPatientInput);
    res.send(patient);
  }
);

export default router;
