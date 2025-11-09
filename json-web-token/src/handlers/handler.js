import { router } from "../routers/router.js";
import { parseRequest, validateSchema, writeResponse } from "../utils/utils.js";

export const handler = async (req, res) => {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = router[endpoint];

    if (!route.controller) {
        writeResponse(res, { message: "Invalid endpoint" }, 404);
        return;
    }

    let body = {};
    if (method === "POST") {
        const rawBody = await parseRequest(req);
        const { valid, message } = validateSchema(rawBody, route.scheme);

        if (!valid) {
            writeResponse(res, { message });
            return;
        }

        body = rawBody;
    }

    try {
        await route.controller(res, body);
    } catch (error) {
        console.error(error);
        writeResponse(res, { message: error.message });
    }

}