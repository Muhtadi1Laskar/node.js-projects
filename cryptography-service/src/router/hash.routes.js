import express from "express";
import { hashData, verifyHash } from "../controller/hash.controller.js";
import { validate } from "../middleware/validationHandler.js";
import { hashSchema } from "../schema/hash.schema.js";
import { verifyHashSchema } from "../schema/verifyHash.schema.js";

const router = express.Router();

router.post("/hash-data", validate(hashSchema), hashData);
router.post("/compare-hash", validate(verifyHashSchema), verifyHash);

export default router;