import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((err: Error) => err.message)
        .join(", ");
      return next(new ApiError(400, errorMessage));
    }

    req.body = value; // Replace with sanitized/validated values
    next();
  };
};
