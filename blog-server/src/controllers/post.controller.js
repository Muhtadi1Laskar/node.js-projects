import { successResponse } from "../utils/response.js";
import { createPost } from "../service/posts.service.js";

export default async function CreatePostController(req, res, next) {
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