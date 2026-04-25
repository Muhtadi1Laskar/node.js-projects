import express from "express";
import signupRouter from "./signup.routes.js";
import loginRouter from "./login.routes.js";

const router = express.Router();

router.use("/signup", signupRouter);
router.use("/login", loginRouter);

export default router;