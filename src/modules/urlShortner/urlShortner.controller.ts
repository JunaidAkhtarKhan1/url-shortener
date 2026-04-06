import { Request, Response, NextFunction } from "express";
import urlShortnerService from "./urlShortner.service";

export async function createUrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const url = req.body.url;
    const result = await urlShortnerService.createShortUrl(url);
    return res.status(201).json({ success: true, result });
  } catch (error) {
    next(error);
  }
}

export async function getUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const code = String(req.params.code);
    const result = await urlShortnerService.readShortUrl(code);
    return res.status(301).redirect(result);
  } catch (error) {
    next(error);
  }
}
