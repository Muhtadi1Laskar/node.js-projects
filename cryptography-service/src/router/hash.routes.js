import express from "express";
import { hashData, verifyHash } from "../controller/hash.controller.js";

const router = express.Router();

router.post("/hash-data", hashData);
router.post("/verify-hash", verifyHash);

export default router;