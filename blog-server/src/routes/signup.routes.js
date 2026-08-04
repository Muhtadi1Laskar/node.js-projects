import express from "express";
import SignupController, { ActivateController } from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/", SignupController);
router.get("/activate/:token", ActivateController);

export default router;