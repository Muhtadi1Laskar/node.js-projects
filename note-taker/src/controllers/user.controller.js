import { createUser } from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

const registerUser = async (res, body) => {
    const { name, email, password } = body;

    // if(!email.test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    //     errorResponse(res, { message: 'Invalid email format' }, 403);
    //     return;
    // }

    if(password.length <= 8) {
        errorResponse(res, { message: 'Password should be longer than 8 characters' }, 403);
        return;
    }

    try {
        const user = await createUser(body);
        console.log(user);
        successResponse(res, user, 201);
    } catch (error) {
        errorResponse(res, { message: error }, 403);
    }
}

export default registerUser;