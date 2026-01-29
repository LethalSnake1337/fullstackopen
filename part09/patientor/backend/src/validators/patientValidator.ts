import { NewPatient, Gender, Patient } from "../types";

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

const assertGender = (value: unknown): asserts value is Gender => {
  assertString(value, "gender");
  if (!Object.values(Gender).includes(value as Gender)) {
    throw new Error(
      `Invalid gender: ${value}. Must be one of: ${Object.values(Gender).join(", ")}`,
    );
  }
};

export const validatePatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid patient data: must be an object");
  }

  const patient = data as Record<string, unknown>;

  // Validate required fields
  if (!("name" in patient)) throw new Error("Missing required field: 'name'");
  if (!("dateOfBirth" in patient))
    throw new Error("Missing required field: 'dateOfBirth'");
  if (!("ssn" in patient)) throw new Error("Missing required field: 'ssn'");
  if (!("gender" in patient))
    throw new Error("Missing required field: 'gender'");
  if (!("occupation" in patient))
    throw new Error("Missing required field: 'occupation'");

  // Validate field types and content
  assertString(patient.name, "name");
  assertString(patient.dateOfBirth, "dateOfBirth");
  assertString(patient.ssn, "ssn");
  assertGender(patient.gender);
  assertString(patient.occupation, "occupation");

  return {
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender as Gender,
    occupation: patient.occupation,
    entries: [],
  };
};
