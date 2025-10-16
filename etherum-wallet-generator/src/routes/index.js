import express from "express";
import keyRoutes from "./keys.routes.js";
import signRoutes from "./sign.routes.js";

const router = express.Router();

router.use("/", keyRoutes);
router.use("/", signRoutes);

export default router;