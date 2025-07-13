import { Request, Response, Router } from "express";
import { getPatients } from "../services/patientService";
import { PatientListItemResult } from "../types/patientTypes";

const router = Router();

router.get("/", (_req: Request, res: Response<PatientListItemResult[]>) => {
  res.send(getPatients());
});

export default router;
