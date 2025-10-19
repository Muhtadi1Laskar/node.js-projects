import express from "express";
import { getAllHash, hashData, multipleHash, verifyHash } from "../controller/hash.controller.js";
import { validate } from "../middleware/validationHandler.js";
import { hashDataSchema, multipleHashSchema, verifyHashSchema } from "../schema/hash.schema.js";

const router = express.Router();

router.get("/get-hashes", getAllHash);
router.post("/hash-data", validate(hashDataSchema), hashData);
router.post("/compare-hash", validate(verifyHashSchema), verifyHash);
router.post("/multiple-hash", validate(multipleHashSchema), multipleHash);

export default router;