import routes from "../routers/routes.js";
import { errorResponse, successResponse } from "../utils/response.js";

async function handler(req, res) {
    const { method, url } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if(!route.controller) {
        errorResponse(404, {
            message: "Invalid endpoint"
        });
        return;
    }
}