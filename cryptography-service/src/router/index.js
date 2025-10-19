import express from "express";
import hashRoutes from "./hash.routes.js";

const router = express.Router();

router.use("/hash", hashRoutes);

export default router;