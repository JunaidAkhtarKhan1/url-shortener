import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";

export default function errorHandler(
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    // For unexpected errors, log them and return generic message
    console.error("Unexpected error:", err);
    message = err.message || message;
  }

  res.status(statusCode).json({ success: false, message });
}
