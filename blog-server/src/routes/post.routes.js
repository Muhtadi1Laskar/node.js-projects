import express from "express";
import { verifyJWT } from "../middleware/authHandler.js";
import CreatePostController from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyJWT, CreatePostController);

export default router;