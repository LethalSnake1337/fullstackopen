export const validateNumber = (value: unknown): boolean => {
  return !isNaN(Number(value));
};

export const parseNumber = (value: string): number => {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Cannot parse "${value}" as a number`);
  }
  return num;
};
