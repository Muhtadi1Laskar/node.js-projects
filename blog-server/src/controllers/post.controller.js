import { successResponse } from "../utils/response.js";
import { createPost, updatePost } from "../service/posts.service.js";

export async function CreatePostController(req, res, next) {
    try {
        const { userId } = req;
        req.body.userId = userId;

        const post = await createPost(req.body);
        const responseBody = {
            message: "Successfully created the post",
            post
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}

export async function UpdatePostController(req, res, next) {
    try {
        const { postId } = req.params;
        const post = await updatePost(req.userId, postId, req.body);
        const responseBody = {
            message: "Successfully updated the post",
            post
        };
        successResponse(res, responseBody, 200);
    } catch(error) {
        next(error);
    }
}