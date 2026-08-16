import express from "express";
import { CreateAccountController, UpdateAccountBalanceController } from "../controllers/account.controller.js";

const router = express.Router();

router.post("/create/:userId", CreateAccountController);
router.post("/update-balance/:userId", UpdateAccountBalanceController)

export default router;