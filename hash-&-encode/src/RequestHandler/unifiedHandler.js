import { parseRequest, validateRequestBody, writeResponse } from "../Common/common.js";
import routes from "../routers.js";

export default async function unifiedHandler(req, res) {
    const { method, url } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if (!route.controller) {
        writeResponse(res, {
            message: "Route not found"
        });
        return;
    }

    let reqBody = '';
    if (method === "POST" || method === "DELETE") {
        const rawReqBody = await parseRequest(req);
        const { valid, message } = validateRequestBody(rawReqBody, route.schema);

        if (!valid) {
            writeResponse(res, { message });
            return;
        }

        reqBody = JSON.parse(rawReqBody || {});
    }

    try {
        await route.controller(res, reqBody);
    } catch (error) {
        console.error(error);
        writeResponse(res, {
            message: error.message
        });
    }
}
