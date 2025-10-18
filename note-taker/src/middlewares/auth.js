import { checkTokenValidity } from "../utils/utils.js";

export async function authMiddleware(req, res, next) {
    const endpoint = `${req.method}:${req.url}`;
    const isPublicRoute = (
        endpoint === "POST:/login" || endpoint === "POST:/register" || endpoint === "GET:/public"
    );
    
    if(isPublicRoute) {
        return next();
    }

    const userID = await checkTokenValidity(req, res);
    if (!userID) return;

    req.userID = userID
    next();
}