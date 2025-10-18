import { parseRequestBody } from "../utils/requests.js";

export async function bodyParserMiddlerware(req, res, next) {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        req.body = await parseRequestBody(req);
    } else {
        req.body = {};
    }
    next();
}