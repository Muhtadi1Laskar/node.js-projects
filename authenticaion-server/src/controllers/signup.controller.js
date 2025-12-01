import { signup } from "../service/signup.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export default async function signupController(req, res, next) {
    try {
        const user = await signup(req.body);
        successResponse(res, user, 201);
    } catch (error) {
        next(error);
    }
}