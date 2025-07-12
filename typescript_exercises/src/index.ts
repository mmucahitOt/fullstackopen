import express from "express";
import { calculateBmi, calculateExercises } from "./util";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  try {
    const { height: heightStr, weight: weightStr } = req.query;
    if (!heightStr || !weightStr) {
      res.status(400).send({ error: "malformatted parameters" });
    }
    if (isNaN(Number(heightStr)) || isNaN(Number(weightStr))) {
      res.status(400).send({ error: "malformatted parameters" });
    }
    const height = Number(heightStr);
    const weight = Number(weightStr);

    const bmi = calculateBmi({
      height,
      weight,
    });
    res.send({
      weight,
      height,
      bmi: bmi,
    });
  } catch (error) {
    res.status(400).send({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  if (!(target instanceof Number)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dailyExerciseDuration: number[] = daily_exercises;

  if (dailyExerciseDuration.some((hours) => hours < 0)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises({
    dailyExerciseDuration: dailyExerciseDuration,
    target: Number(target),
  });
  return res.send(result);
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
