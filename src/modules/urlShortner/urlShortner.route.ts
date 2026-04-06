import { Router } from "express";
import { createUrl, getUrl } from "./urlShortner.controller.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { urlSchema } from "./urlShortner.validate.js";
import rateLimiter from "../../middleware/redisRateLimiter.middleware.js";

const router = Router();

router.post("/shorten", rateLimiter, validateRequest(urlSchema), createUrl);
router.get("/:code", getUrl);

export default router;
