import express from "express";
import { validate } from "../middleware/validataionHandler.js";
import {
    passphraseSchema, passwordSchema, strengthSchema
} from "../schema/password.schema.js";

const router = express.Router();

router.post("/generate", validate(passwordSchema));
router.post("/passphrase", validate(passphraseSchema));
router.post("/strength", validate(strengthSchema));

export default router;