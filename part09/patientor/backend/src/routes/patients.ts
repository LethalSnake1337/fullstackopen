import express, { Request, Response } from "express";
import patientQueryService from "../services/patientQueryService";
import { validatePatient } from "../validators/patientValidator";
import { validateEntry } from "../validators/entryValidator";
import { handleValidationError } from "../utils/errorHandler";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  const publicPatients = patientQueryService.getAllPublic();
  res.json(publicPatients);
});

router.get("/:id", (req: Request, res: Response) => {
  const patient = patientQueryService.getById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json(handleValidationError("Patient not found"));
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const validatedPatient = validatePatient(req.body);
    const createdPatient = patientQueryService.addNew(validatedPatient);
    res.status(201).json(createdPatient);
  } catch (error) {
    res.status(400).json(handleValidationError(error));
  }
});

router.post("/:id/entries", (req: Request, res: Response) => {
  try {
    const validatedEntry = validateEntry(req.body);
    const updatedPatient = patientQueryService.addEntryToPatient(
      req.params.id,
      validatedEntry,
    );

    if (!updatedPatient) {
      res.status(404).json(handleValidationError("Patient not found"));
      return;
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json(handleValidationError(error));
  }
});

export default router;
