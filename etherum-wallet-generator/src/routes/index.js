import express from "express";
import keyRoutes from "./keys.routes.js";

const router = express.Router();

router.use("/", keyRoutes);

export default router;