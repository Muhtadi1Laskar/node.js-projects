import { createUser } from "../services/user.service.js";
import { successResponse } from "../utils/response.js";

export async function UserController(req, res, next) {
    console.log("HIT");
    try {
        const user = await createUser(req.body);

        const responseBody = {
            message: "Successfully created the user",
            user
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}