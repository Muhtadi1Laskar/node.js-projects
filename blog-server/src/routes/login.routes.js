import express from "express";
import { LoginController } from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/", LoginController);

export default router;