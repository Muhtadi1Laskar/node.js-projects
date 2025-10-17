import routes from "../routers/routes.js";
import { errorResponse, successResponse } from "../utils/response.js";

export default async function handler(req, res) {
    const { method, url } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if (!route.controller) {
        errorResponse(res, {
            message: "Invalid endpoint"
        }, 404);
        return;
    }

    let body = "";
    if (method === "POST" || method === "PUT" || method === "DELETE") {
        const rawReqBody = await parseRequestBody(req);
        const { valid, message } = validateSchema(req, route.schema);

        if (!valid) {
            errorResponse(res, {
                message
            }, 403);
            return
        }

        body = rawReqBody;
    }

    try {
        await route.controller(res, body);
    } catch (error) {
        errorResponse(res, {
            message: error
        }, 404);
    }
}