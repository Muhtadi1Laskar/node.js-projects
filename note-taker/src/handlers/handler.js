import routes from "../routers/routes.js";
import { errorResponse } from "../utils/response.js";
import { loggerMiddleware } from "../middlewares/logger.js";
import { authMiddleware } from "../middlewares/auth.js";
import { bodyParserMiddlerware } from "../middlewares/bodyParser.js";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidator.js";

const middlewares = [
    loggerMiddleware,
    authMiddleware,
    bodyParserMiddlerware,
    schemaValidatorMiddleware
];

export default async function handler(req, res) {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if (!route) {
        errorResponse(res, { message: "Invalid endpoint" }, 404);
        return;
    }

    req.route = route;

    let idx = 0;
    const next = async () => {
        const middleware = middlewares[idx++];
        if (middleware) {
            await middleware(req, res, next);
        } else {
            try {
                await route.controller(res, { ...req.body, usedID: req.usedID });
            } catch (error) {
                console.error(error);
                errorResponse(res, { message: error.message || "Server Error" }, 500);
            }
        }
    }
    await next();
}