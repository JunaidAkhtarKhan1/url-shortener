import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        errors: error.details.map((err: Error) => err.message),
      });
    }

    req.body = value; // Replace with sanitized/validated values
    next();
  };
};
