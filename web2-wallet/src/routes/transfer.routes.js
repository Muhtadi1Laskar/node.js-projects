import express from "express";
import { CreateTransferController, RetriveTransferController } from "../controllers/transfer.controller.js";

const router = express.Router();

router.get("/get-transfers/:id", RetriveTransferController);
router.post("/create", CreateTransferController);

export default router;