export const apiErrorResponse = (message: string) => ({
  error: message,
});

export const handleValidationError = (error: unknown) => {
  if (error instanceof Error) {
    return apiErrorResponse(error.message);
  }
  return apiErrorResponse("An unexpected error occurred");
};
