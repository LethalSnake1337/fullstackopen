export const isValidNumber = (value: unknown): boolean => {
  return !isNaN(Number(value));
};
