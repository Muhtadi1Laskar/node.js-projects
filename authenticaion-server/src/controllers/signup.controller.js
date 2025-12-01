import { signup } from "../service/signup.service.js";
import { successResponse } from "../utils/response.js";

export default async function signupController(req, res, next) {
    const {
        email,
        phone,
        firstName,
        lastName,
        password
    } = req.body;

    try {
        const user = await signup(req.body);
        successResponse(res, user, 200);
    } catch (error) {
        next(error);
    }
}