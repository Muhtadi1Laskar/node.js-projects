import express from "express";
import { getAllHash, hashData, hashFile, multipleHash, verifyHash } from "../controller/hash.controller.js";
import { validate } from "../middleware/validationHandler.js";
import { hashDataSchema, hashFileSchema, multipleHashSchema, verifyHashSchema } from "../schema/hash.schema.js";
import { uploadSingle } from "../middleware/fileHandler.js";

const router = express.Router();

router.get("/get-hashes", getAllHash);
router.post("/hash-data", validate(hashDataSchema), hashData);
router.post("/compare-hash", validate(verifyHashSchema), verifyHash);
router.post("/multiple-hash", validate(multipleHashSchema), multipleHash);
router.post("/file/hash-data", uploadSingle, validate(hashFileSchema), hashFile);

export default router;