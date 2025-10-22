import router from "../routers/router.js";
import { parseRequestBody, validateSchema, writeResponse } from "../utils/utils.js";

export const identiconHandler = async (req, res) => {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = router[endpoint];

    if (!route.controller) {
        writeResponse(res, { message: "Invalid endpoint" }, 404);
        return;
    }

    let body = {};
    if (method === "POST") {
        const rawBody = await parseRequestBody(req);
        const { valid, message } = validateSchema(rawBody, route.schema);

        if (!valid) {
            writeResponse(res, { message }, 404);
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
        }, 404);
    }
}