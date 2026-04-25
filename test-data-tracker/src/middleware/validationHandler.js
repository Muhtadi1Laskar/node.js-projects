import { errorResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return errorResponse(res, {
            message: error.details[0].message
        }, 400);
    }
    next();
}