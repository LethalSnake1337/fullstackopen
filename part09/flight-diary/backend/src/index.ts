import express from "express";
import diariesRouter from "./routes/diaries";
import { requestLogger, errorHandler } from "./middleware/handlers";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/diaries", diariesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
