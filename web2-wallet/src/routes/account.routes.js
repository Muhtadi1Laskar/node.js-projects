import express from "express";
import { CheckAccountBalance, CreateAccountController, UpdateAccountBalanceController } from "../controllers/account.controller.js";

const router = express.Router();

router.post("/create/:userId", CreateAccountController);
router.post("/update-balance/:userId", UpdateAccountBalanceController);
router.get("/balance/:userId", CheckAccountBalance);

export default router;