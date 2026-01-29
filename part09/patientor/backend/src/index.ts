import express, { Request, Response } from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import healthRouter from "./routes/ping";

const app = express();
const PORT = 3001;

// CORS Configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "operational" });
});

// API routes
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/ping", healthRouter);

app.listen(PORT, () => {
  console.log(`Patientor API initialized on port ${PORT}`);
});
