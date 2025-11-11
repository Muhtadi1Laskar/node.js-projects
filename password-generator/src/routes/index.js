import express from "express";
import passwordRouter from "./password.routes.js";

const router = express.Router();

router.use("/operation", passwordRouter);

export default router;