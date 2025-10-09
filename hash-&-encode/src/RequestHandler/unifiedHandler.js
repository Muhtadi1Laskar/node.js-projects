import { parseRequest, writeResponse } from "../Common/common.js";
import routes from "../routers.js";

export default async function unifiedHandler(req, res) {
    const { method, url } = req;
    const endpoint = `${method}:${url}`;
    const controller = routes[endpoint];

    if (!controller) {
        writeResponse(res, {
            message: "Route not found"
        });
        return;
    }

    let reqBody = '';
    if (method === "POST" || method === "DELETE") {
        const rawReqBody = await parseRequest(req);
        reqBody = JSON.parse(rawReqBody || {});
    }

    try {
        await controller(res, reqBody);
    } catch (error) {
        console.error(error);
        writeResponse(res, {
            message: error.message
        });
    }
}
