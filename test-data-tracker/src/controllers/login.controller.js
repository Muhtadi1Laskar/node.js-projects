import { login } from "../service/login.service.js";
import { successResponse } from "../utils/response.js";

export default async function LoginController(req, res, next) {
    try {
        const token = await login(req.body);
        const responseBody = {
            message: "Login successful",
            token: "Bearer " + token
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}