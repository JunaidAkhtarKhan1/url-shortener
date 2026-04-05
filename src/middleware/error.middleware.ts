import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message });
}
