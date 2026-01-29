import { Diagnosis, Patient, Entry, EntryType } from "../types";

export const filterDiagnosesByCode = (
  codes: string[],
  diagnoses: Diagnosis[],
): Diagnosis[] => {
  return diagnoses.filter((d) => codes.includes(d.code));
};

export const getEntryTypeLabel = (type: EntryType): string => {
  switch (type) {
    case EntryType.HealthCheck:
      return "Health Check";
    case EntryType.OccupationalHealthcare:
      return "Occupational Healthcare";
    case EntryType.Hospital:
      return "Hospital";
    default:
      return "Unknown";
  }
};

export const isEntry = (obj: unknown): obj is Entry => {
  if (typeof obj !== "object" || obj === null) return false;
  const entry = obj as Record<string, unknown>;
  return (
    "id" in entry &&
    "type" in entry &&
    "description" in entry &&
    "date" in entry
  );
};
