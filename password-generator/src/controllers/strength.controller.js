import { checkStrength } from "../services/strength.service.js";
import { successResponse } from "../utils/response.js";

export const strengthCheckerController = (req, res, next) => {
    const {
        password
    } = req.body;

    try {
        const analysis = checkStrength(password);
        successResponse(res, { analysis }, 200);
    } catch (error) {
        next(error);
    }
}