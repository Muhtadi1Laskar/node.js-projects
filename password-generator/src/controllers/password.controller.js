import { generatePassword } from "../services/password.service.js";
import { successResponse } from "../utils/response.js";

export const generatePasswordController = (req, res, next) => {
    const {
        length,
        types
    } = req.body;

    try {
        const password = generatePassword(length, types);
        successResponse(res, { password }, 200);
    } catch (error) {
        next(error);
    }
}