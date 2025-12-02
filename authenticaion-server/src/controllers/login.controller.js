import { login } from "../service/login.service.js";
import { successResponse } from "../utils/response.js";

export default async function loginController(req, res, next) {
    try {
        const loginSuccess = await login(req.body);
        successResponse(res, loginSuccess, 200);
    } catch (error) {
        next(error);
    }
}