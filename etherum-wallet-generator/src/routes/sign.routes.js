import express from "express";

const router = express.Router();

router.post("/sign", signMessage);

export default router;