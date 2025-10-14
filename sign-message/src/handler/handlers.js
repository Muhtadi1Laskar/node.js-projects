import routes from "../routes.js";
import { writeResponse } from "../utils/utils.js";

export default async function handlers(req, res) {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if(!route) {
        writeResponse(res, {
            message: "Invalid Route"
        });
        return;
    }
}