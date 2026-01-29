import express, { Request, Response } from "express";
import { isValidNumber } from "./src/utils/typeGuards";
import { calculateBmi } from "./src/calculators/bmiCalculator";
import { calculateExercises } from "./src/calculators/exerciseCalculator";

const app = express();
app.use(express.json());

const PORT = 3002;

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// BMI calculation endpoint
app.get("/bmi", (req: Request, res: Response) => {
  const { weight, height } = req.query;

  if (!weight || !height) {
    res.status(400).json({ error: "Missing weight or height parameters" });
    return;
  }

  if (!isValidNumber(weight) || !isValidNumber(height)) {
    res.status(400).json({ error: "Weight and height must be valid numbers" });
    return;
  }

  try {
    const classification = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi: classification,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

// Exercise calculation endpoint
app.post("/exercises", (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "Missing daily_exercises or target" });
    return;
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({ error: "daily_exercises must be an array" });
    return;
  }

  if (!isValidNumber(target)) {
    res.status(400).json({ error: "target must be a valid number" });
    return;
  }

  try {
    const result = calculateExercises(
      daily_exercises.map(Number),
      Number(target),
    );
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Health & Fitness API running on port ${PORT}`);
});
