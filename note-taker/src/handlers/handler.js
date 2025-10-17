import routes from "../routers/routes.js";
import { parseRequestBody } from "../utils/requests.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { validateSchema } from "../utils/utils.js";

export default async function handler(req, res) {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    console.log(endpoint, route);

    if (!route.controller) {
        errorResponse(res, {
            message: "Invalid endpoint"
        }, 404);
        return;
    }

    let body = {};
    if (method === "POST" || method === "PUT" || method === "DELETE") {
        const rawReqBody = await parseRequestBody(req);
        const { valid, message } = validateSchema(rawReqBody, route.schema);

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
        console.error(error);
        errorResponse(res, {
            message: error
        }, 404);
    }
}