import { Router } from "express";
import { createUrl, getUrl } from "./urlShortner.controller";

const router = Router();

router.post("/shorten", createUrl);
router.get("/", getUrl);

export default router;
