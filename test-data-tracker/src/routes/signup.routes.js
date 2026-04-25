import express from "express";
import { validate } from "../middleware/validationHandler.js";
import { signupSchema } from "../schema/signup.schema.js";
import { signupController, activateController } from "../controllers/singup.controller.js";

const router = express.Router();

router.post("/", validate(signupSchema), signupController);
router.get("/activate/:token", activateController);

export default router;