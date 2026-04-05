import { Request, Response, NextFunction } from "express";
import urlShortnerService from "./urlShortner.service";

export async function createUrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await urlShortnerService.createShortUrl();
    throw new Error("Failed to call api");
    return res.status(201).json({ success: true, result });
  } catch (error) {
    next(error);
  }
}

export async function getUrl(req: Request, res: Response, next: NextFunction) {
  //Call service
  try {
    const result = await urlShortnerService.readShortUrl();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
}
