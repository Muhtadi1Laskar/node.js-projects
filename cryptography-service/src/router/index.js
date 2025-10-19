import express from "express";
import hashRoutes from "./hash.routes.js";
import hmacRoutes from "./hmac.routes.js";

const router = express.Router();

router.use("/hash", hashRoutes);
router.use("/hmac", hmacRoutes);

export default router;