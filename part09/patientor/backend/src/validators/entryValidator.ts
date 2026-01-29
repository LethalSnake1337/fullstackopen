import { EntryWithoutId, HealthCheckRating, SickLeave } from "../types";

const assertString = (
  value: unknown,
  fieldName: string,
): asserts value is string => {
  if (typeof value !== "string" && !(value instanceof String)) {
    throw new Error(`Field '${fieldName}' must be a string`);
  }
  if (String(value).trim().length === 0) {
    throw new Error(`Field '${fieldName}' cannot be empty`);
  }
};

const assertNumber = (
  value: unknown,
  fieldName: string,
): asserts value is number => {
  if (typeof value !== "number") {
    throw new Error(`Field '${fieldName}' must be a number`);
  }
};

const extractDiagnosisCodes = (data: Record<string, unknown>): string[] => {
  if (!("diagnosisCodes" in data) || !Array.isArray(data.diagnosisCodes)) {
    return [];
  }
  return data.diagnosisCodes;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  assertNumber(rating, "healthCheckRating");
  if (rating < 0 || rating > 3 || !Number.isInteger(rating)) {
    throw new Error("Health check rating must be 0, 1, 2, or 3");
  }
  return rating as HealthCheckRating;
};

const parseSickLeave = (obj: unknown): SickLeave | undefined => {
  if (!obj || typeof obj !== "object" || !("sickLeave" in obj)) {
    return undefined;
  }

  const sl = (obj as Record<string, unknown>).sickLeave;
  if (!sl || typeof sl !== "object") {
    return undefined;
  }

  if (!("startDate" in sl) || !("endDate" in sl)) {
    throw new Error("Sick leave must have startDate and endDate");
  }

  return {
    startDate: String(sl.startDate),
    endDate: String(sl.endDate),
  };
};

export const validateEntry = (data: unknown): EntryWithoutId => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid entry data: must be an object");
  }

  const entry = data as Record<string, unknown>;

  // Validate common fields
  if (!("description" in entry))
    throw new Error("Missing required field: 'description'");
  if (!("date" in entry)) throw new Error("Missing required field: 'date'");
  if (!("specialist" in entry))
    throw new Error("Missing required field: 'specialist'");
  if (!("type" in entry)) throw new Error("Missing required field: 'type'");

  assertString(entry.description, "description");
  assertString(entry.date, "date");
  assertString(entry.specialist, "specialist");
  assertString(entry.type, "type");

  const baseEntry = {
    description: entry.description,
    date: entry.date,
    specialist: entry.specialist,
    diagnosisCodes: extractDiagnosisCodes(entry),
  };

  // Validate based on entry type
  switch (entry.type) {
    case "HealthCheck":
      if (!("healthCheckRating" in entry)) {
        throw new Error("Missing required field: 'healthCheckRating'");
      }
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };

    case "Hospital":
      if (!("discharge" in entry)) {
        throw new Error("Missing required field: 'discharge'");
      }
      if (typeof entry.discharge !== "object" || entry.discharge === null) {
        throw new Error("Field 'discharge' must be an object");
      }
      const discharge = entry.discharge as Record<string, unknown>;
      if (!("date" in discharge) || !("criteria" in discharge)) {
        throw new Error("Discharge must have 'date' and 'criteria'");
      }
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: String(discharge.date),
          criteria: String(discharge.criteria),
        },
      };

    case "OccupationalHealthcare":
      if (!("employerName" in entry)) {
        throw new Error("Missing required field: 'employerName'");
      }
      assertString(entry.employerName, "employerName");
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: entry.employerName,
        sickLeave: parseSickLeave(entry),
      };

    default:
      throw new Error(`Unknown entry type: '${entry.type}'`);
  }
};
