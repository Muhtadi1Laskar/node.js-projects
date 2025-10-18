import routes from "../routers/routes.js";
import { checkTokenValidity } from "../utils/utils.js";
import { parseRequestBody } from "../utils/requests.js";
import { errorResponse } from "../utils/response.js";
import { validateSchema } from "../utils/utils.js";

const handleBodyProcessing = async (req, res, route) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        const reqBody = await parseRequestBody(req);
        const { valid, message } = validateSchema(reqBody, route.schema);

        console.log(valid, message, reqBody, route.schema);

        if (!valid) {
            errorResponse(res, { message }, 403);
            return
        }

        return reqBody;
    }
    return {};
}

export default async function handler(req, res) {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = routes[endpoint];

    if (!route) {
        errorResponse(res, { message: "Invalid endpoint" }, 404);
        return;
    }

    const isPublicRoute = (
        endpoint === "POST:/login" || endpoint === "POST:/register" || endpoint === "GET:/public"
    );

    if (!isPublicRoute) {
        const id = await checkTokenValidity(req, res);
        if (!id) {
            return;
        }
        req.userID = id;
    }

    let body = await handleBodyProcessing(req, res, route);

    if (!isPublicRoute && req.userID) {
        body["userID"] = req.userID;
    }

    try {
        await route.controller(res, body);
    } catch (error) {
        console.error(error);
        errorResponse(res, { message: error }, 404);
    }
}