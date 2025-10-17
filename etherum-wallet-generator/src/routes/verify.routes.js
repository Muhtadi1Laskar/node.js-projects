import express from "express";
import verifyMessageController from "../controllers/verifyMessage.controller.js";

const router = express.Router();

router.post("/verify", verifyMessageController);

export default router;