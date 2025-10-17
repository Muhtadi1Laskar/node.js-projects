import express from "express";
import keyRoutes from "./keys.routes.js";
import signRoutes from "./sign.routes.js";
import verifyRoutes from "./verify.routes.js"

const router = express.Router();

router.use("/", keyRoutes);
router.use("/", signRoutes);
router.use("/", verifyRoutes);

export default router;