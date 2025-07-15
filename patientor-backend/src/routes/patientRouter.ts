import { Request, Response, Router } from "express";
import { createPatient, getPatientById, getPatients } from "../services/patientService";
import {
  Patient,
  PatientCreateInput,
  NonSensitivePatient,
} from "../types/patientTypes";
import { validateCreatePatientMiddleware } from "../validation/validateCreatePatient";

const router = Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(getPatients());
});

router.get("/:id", (req: Request, res: Response<Patient>) => {
  const patient = getPatientById(req.params.id);
  res.send(patient);
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
