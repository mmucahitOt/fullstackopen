import { Request, Response, Router } from "express";
import {
  createPatient,
  getPatientById,
  getPatients,
} from "../services/patientService";
import {
  Patient,
  PatientCreateInput,
  NonSensitivePatient,
} from "../types/patientTypes";
import { validateCreatePatientMiddleware } from "../validation/validateCreatePatient";
import { Entry, EntryCreateInput } from "../types/entryTypes";
import { createEntry } from "../services/entryService";
import validateCreateEntryMiddleware from "../validation/validateCreateEntry";

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

router.post(
  "/:id/entries",
  validateCreateEntryMiddleware,
  (
    req: Request<{ id: string }, unknown, EntryCreateInput>,
    res: Response<Entry | string>
  ) => {
    try {
      const newEntry = createEntry({
        patientId: req.params.id,
        entryInput: req.body,
      });
      return res.send(newEntry);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage = " Error: " + error.message;
      }
      return res.status(400).send(errorMessage);
    }
  }
);

export default router;
