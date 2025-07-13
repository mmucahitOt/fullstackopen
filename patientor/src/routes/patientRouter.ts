import { Request, Response, Router } from "express";
import { createPatient, getPatients } from "../services/patientService";
import { Patient, PatientListItemResult } from "../types/patientTypes";
import { transformCreatePatient } from "../transformers";

const router = Router();

router.get("/", (_req: Request, res: Response<PatientListItemResult[]>) => {
  res.send(getPatients());
});

router.post("/", (req: Request, res: Response<Patient>) => {
  const newPatient = transformCreatePatient(req.body);
  const patient = createPatient(newPatient);
  res.send(patient);
});

export default router;
