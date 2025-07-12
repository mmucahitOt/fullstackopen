import express from "express";
import { calculateBmi } from "./util";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
