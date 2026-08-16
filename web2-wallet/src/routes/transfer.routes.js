import express from "express";
import { CreateTransferController } from "../controllers/transfer.controller.js";

const router = express.Router();

router.post("/create", CreateTransferController);

export default router;