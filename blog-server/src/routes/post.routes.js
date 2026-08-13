import express from "express";
import { verifyJWT } from "../middleware/authHandler.js";
import { CreatePostController, UpdatePostController } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyJWT, CreatePostController);
router.put("/update/:postId", verifyJWT, UpdatePostController);

export default router;