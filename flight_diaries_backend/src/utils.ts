import { z } from "zod";
import { Visibility, Weather } from "./types";
import { NextFunction, Request, Response } from "express";

export const newDiaryValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    NewDiaryValidationSchema.parse(req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Invalid diary entry",
      });
  }
};

export const NewDiaryValidationSchema = z.object({
  date: z.string(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export default newDiaryValidationMiddleware;
