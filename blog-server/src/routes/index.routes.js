import express from "express";
import signupRouter from "./signup.routes.js";

const router = express.Router();

router.use("/signup", signupRouter);

export default router;