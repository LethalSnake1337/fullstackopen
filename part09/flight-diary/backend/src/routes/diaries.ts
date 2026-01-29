import express from "express";
import diaryQueryService from "../services/diaryQueryService";
import { parseEntryData } from "../validators/entryValidator";

const router = express.Router();

router.get("/", (_req, res) => {
  const entries = diaryQueryService.getPublicEntries();
  res.json(entries);
});

router.get("/:id", (req, res) => {
  const entryId = Number(req.params.id);

  if (isNaN(entryId)) {
    res.status(400).json({ error: "Invalid entry ID" });
    return;
  }

  const entry = diaryQueryService.getEntryById(entryId);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ error: "Entry not found" });
  }
});

router.post("/", (req, res) => {
  try {
    const newEntry = parseEntryData(req.body);
    const createdEntry = diaryQueryService.createEntry(newEntry);
    res.status(201).json(createdEntry);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

export default router;
