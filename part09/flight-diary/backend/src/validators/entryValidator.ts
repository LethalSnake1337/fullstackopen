import { NewDiaryEntry, Weather, Visibility } from "../types";

const assertString = (value: unknown): asserts value is string => {
  if (typeof value !== "string" && !(value instanceof String)) {
    throw new Error("Value is not a string");
  }
};

const assertDate = (value: string): void => {
  if (!Date.parse(value)) {
    throw new Error(`Invalid date: ${value}`);
  }
};

const assertWeather = (value: string): asserts value is Weather => {
  if (!Object.values(Weather).includes(value as Weather)) {
    throw new Error(`Invalid weather: ${value}`);
  }
};

const assertVisibility = (value: string): asserts value is Visibility => {
  if (!Object.values(Visibility).includes(value as Visibility)) {
    throw new Error(`Invalid visibility: ${value}`);
  }
};

export const parseEntryData = (data: unknown): NewDiaryEntry => {
  if (!data || typeof data !== "object") {
    throw new Error("Entry data is invalid");
  }

  const entry = data as Record<string, unknown>;

  // Validate all required fields exist
  if (
    !("date" in entry) ||
    !("weather" in entry) ||
    !("visibility" in entry) ||
    !("comment" in entry)
  ) {
    throw new Error("Missing required entry fields");
  }

  // Parse and validate each field
  assertString(entry.date);
  assertDate(entry.date);

  assertString(entry.weather);
  assertWeather(entry.weather);

  assertString(entry.visibility);
  assertVisibility(entry.visibility);

  assertString(entry.comment);

  return {
    date: entry.date,
    weather: entry.weather,
    visibility: entry.visibility,
    comment: entry.comment,
  };
};
