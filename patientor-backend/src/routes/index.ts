import { Router } from "express";
import patientRouter from "./patientRouter";
import diagnoseRouter from "./diagnoseRouter";

const router = Router();

router.use("/patients", patientRouter);
router.use("/diagnoses", diagnoseRouter);

router.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

export default router;
