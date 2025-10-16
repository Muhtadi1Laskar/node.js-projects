import routes from "../routes.js";
import { parseRequest, validateRequestBody, writeResponse } from "../utils/utils.js";

export default async function handlers(req, res) {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if (!route.controller) {
        writeResponse(res, {
            message: "Route not found"
        });
        return;
    }

    let body = {};
    if(method === "POST") {
        const rawBody = await parseRequest(req);
        const { valid, message } = validateRequestBody(rawBody, route.schema);

        if(!valid) {
            writeResponse(res, { message });
            return;
        }

        body = rawBody;
    }

    try {
        await route.controller(res, body);
    } catch (error) {
        console.error(error);
        writeResponse(res, {
            message: error.message
        });
    }
}