import express from "express";
import { hashData, verifyHash } from "../controller/hash.controller.js";
import { validate } from "../middleware/validationHandler.js";
import { hashSchema } from "../schema/hash.schema.js";

const router = express.Router();

router.post("/hash-data", validate(hashSchema), hashData);
router.post("/verify-hash", verifyHash);

export default router;