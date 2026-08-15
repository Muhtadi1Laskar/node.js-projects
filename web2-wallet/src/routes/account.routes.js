import express from "express";
import { CreateAccountController } from "../controllers/account.controller.js";

const router = express.Router();

router.post("/create/:userId", CreateAccountController);

export default router;