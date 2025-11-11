import express from "express";
import { validate } from "../middleware/validataionHandler.js";

const router = express.Router();

router.post("/generate", validate());
router.post("/passphrase", validate());
router.post("/strength", validate());

export default router;