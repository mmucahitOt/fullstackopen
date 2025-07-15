import express, { Request, Response } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry, ResponseBody } from "../types";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response<ResponseBody<DiaryEntry[]>>) => {
  res.send({ data: diaryService.getEntries() });
});

router.get("/:id", (req: Request, res: Response<ResponseBody<DiaryEntry>>) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (!diary) {
    return res.status(404).send({ error: { message: "Diary not found" } });
  }
  return res.send({ data: diary });
});

router.post(
  "/",
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<ResponseBody<DiaryEntry>>
  ) => {
    try {
      const newDiaryEntry = toNewDiaryEntry(req.body);
      const addedEntry = diaryService.createDiary(newDiaryEntry);
      if (!addedEntry) {
        return res
          .status(400)
          .send({ error: { message: "Diary not created" } });
      }
      return res.send({ data: addedEntry });
    } catch (error: unknown) {
      console.log("error", error);
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage = " Error: " + error.message;
      }
      return res.status(400).send({ error: { message: errorMessage } });
    }
  }
);

export default router;
