import express from "express";
import signupRouter from "./signup.routes.js";

const rounter = express.Router();

router.use("/signup", signupRouter);

export default router;