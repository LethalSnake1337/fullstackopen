import express, { Request, Response } from "express";

export const errorHandler = (err: unknown, _req: Request, res: Response) => {
  let errorMessage = "An unexpected error occurred";

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  res.status(400).json({ error: errorMessage });
};

export const requestLogger = (
  req: Request,
  _res: Response,
  next: () => void,
) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};
