import express from "express";
import { validate } from "../middleware/validationHandler.js";
import { loginSchema } from "../schema/login.schema.js";
import LoginController from "../controllers/login.controller.js";

const router = express.Router();

router.post("/", validate(loginSchema), LoginController);

export default router;