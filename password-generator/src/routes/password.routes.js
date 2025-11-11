import express from "express";
import { validate } from "../middleware/validataionHandler.js";
import {
    passphraseSchema, passwordSchema, strengthSchema
} from "../schema/password.schema.js";
import { generatePasswordController } from "../controllers/password.controller.js";
import { passphraseController } from "../controllers/passphrase.controller.js";
import { strengthCheckerController } from "../controllers/strength.controller.js";

const router = express.Router();

router.post("/generate", validate(passwordSchema), generatePasswordController);
router.post("/passphrase", validate(passphraseSchema), passphraseController);
router.post("/strength", validate(strengthSchema), strengthCheckerController);

export default router;