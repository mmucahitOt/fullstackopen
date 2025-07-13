import { Request, Response, Router } from "express";
import { getDiagnoses, createDiagnosis } from "../services/diagnoseService";
import { Diagnosis, DiagnosisCreateInput } from "../types/diagnoseTypes";

const router = Router();

router.get("/", (_req, res) => {
  res.send(getDiagnoses());
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
