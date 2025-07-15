import express, { Request, Response } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import { newDiaryValidationMiddleware } from "../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get(
  "/:id",
  (req: Request, res: Response<DiaryEntry | { error: string }>) => {
    const diary = diaryService.findById(Number(req.params.id));
    if (!diary) {
      return res.status(404).send({ error: "Diary not found" });
    }
    return res.send(diary);
  }
);

router.post(
  "/",
  newDiaryValidationMiddleware,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry | { error: string }>
  ) => {
    try {
      const newDiaryEntry = req.body;
      const addedDiaryEntry = diaryService.createDiary(newDiaryEntry);
      res.send(addedDiaryEntry);
    } catch (error: unknown) {
      let errorMessage: string = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      res.status(400).send({ error: errorMessage });
    }
  }
);

export default router;
