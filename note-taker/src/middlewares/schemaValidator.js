import { errorResponse } from "../utils/response.js";
import { validateSchema } from "../utils/utils.js";

export async function schemaValidatorMiddleware(req, res, next) {
    if (!req.route.schema) return next();

    const { valid, message } = validateSchema(req.body, req.route.schema);
    if (!valid) {
        errorResponse(res, { message }, 400);
        return;
    }
    next();
}