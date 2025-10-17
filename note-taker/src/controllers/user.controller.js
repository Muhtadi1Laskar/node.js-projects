import { createUser, findUser } from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

const registerUser = async (res, body) => {
    const { name, email, password } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
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
        const isRegistered = await findUser({ email });

        if (isRegistered.length > 0) {
            errorResponse(res, {
                message: `User with the email: ${email} alread exists`
            }, 403);
            return;
        }

        const user = await createUser(body);
        successResponse(res, user, 201);
    } catch (error) {
        errorResponse(res, { message: error }, 403);
    }
}

export default registerUser;