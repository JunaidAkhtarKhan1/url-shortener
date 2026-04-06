import { Router } from "express";
import { createUrl, getUrl } from "./urlShortner.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { urlSchema } from "./urlShortner.validate";

const router = Router();

router.post("/shorten", validateRequest(urlSchema), createUrl);
router.get("/", getUrl);

export default router;
