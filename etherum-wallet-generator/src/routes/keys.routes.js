import express from "express";
import generateKeys from "../controllers/generateKeys.controller.js";

const router = express.Router();

router.get("/generate-key", generateKeys);

export default router;
