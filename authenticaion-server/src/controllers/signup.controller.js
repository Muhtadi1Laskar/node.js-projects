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
        successResponse(res, { "message": "Success Bitch" }, 200);
    } catch (error) {
        next(error);
    }
}