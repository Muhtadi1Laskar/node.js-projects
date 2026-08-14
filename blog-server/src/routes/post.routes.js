import express from "express";
import { verifyJWT } from "../middleware/authHandler.js";
import { CreatePostController, DeletePostController, UpdatePostController } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyJWT, CreatePostController);
router.put("/update/:postId", verifyJWT, UpdatePostController);
router.delete("/delete/:postId", verifyJWT, DeletePostController);

export default router;