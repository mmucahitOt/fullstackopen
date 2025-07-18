import { Request, Response, Router } from "express";
import { getDiagnoses, createDiagnosis, getDiagnosisCodes } from "../services/diagnoseService";
import { Diagnosis, DiagnosisCreateInput } from "../types/diagnoseTypes";

const router = Router();

router.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
  res.send(getDiagnoses());
});

router.get("/codes", (_req: Request, res: Response<string[]>) => {
  res.send(getDiagnosisCodes());
});

router.post(
  "/",
  (
    req: Request<object, Diagnosis, DiagnosisCreateInput>,
    res: Response<Diagnosis>
  ) => {
    const diagnosis = createDiagnosis(req.body);
    res.send(diagnosis);
  }
);

export default router;
