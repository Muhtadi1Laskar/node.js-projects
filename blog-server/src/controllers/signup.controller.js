import { activateUser, getAllUser, signup } from "../service/signup.service.js";
import { successResponse } from "../utils/response.js";

export default async function SignupController(req, res, next) {
    try {
        const token = await signup(req.body);
        successResponse(res, token, 201);
    } catch(error) {
        next(error);
    }
}

export async function ActivateController(req, res, next) {
    try {
        const { tokenId, tokenSecret } = req.params;
        const response = await activateUser(tokenId, tokenSecret);
        successResponse(res, { message: response }, 200);
    } catch(error) {
        next(error);
    }
}


export async function RetriveAllUsersController(req, res, next) {
    try {
        const response = await getAllUser(req.params.token);
        successResponse(res, response, 200);
    } catch (error) {
        next(error);
    }
}