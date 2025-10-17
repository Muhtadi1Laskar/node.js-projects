import express from "express";
import signMessageController from "../controllers/signMessage.controller.js";

const router = express.Router();

router.post("/sign", signMessageController);

export default router;