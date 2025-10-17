import { authenticateUser, createUser } from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { isValidEmail } from "../utils/utils.js";

export const registerUser = async (res, body) => {
    const { email, password } = body;

    if (!isValidEmail(email)) {
        errorResponse(res, {
            message: 'Invalid email format'
        }, 403);
        return;
    }

    if (password.length <= 8) {
        errorResponse(res, {
            message: 'Password should be longer than 8 characters'
        }, 403);
        return;
    }

    try {
        const user = await createUser(body);
        successResponse(res, user, 201);
    } catch (error) {
        errorResponse(res, { message: error.message }, 403);
    }
}


export const login = async (res, body) => {
    const { email } = body;

    if (!isValidEmail(email)) {
        errorResponse(res, {
            message: 'Invalid email format'
        }, 403);
        return;
    }

    try {
        const token = await authenticateUser(body);
        successResponse(res, {
            message: "Login in successful",
            token
        }, 200);
    } catch (error) {
        errorResponse(res, {
            message: error.message || "Authentication Failed"
        }, 401);
    }

}