import { createAccount } from "../services/account.service.js";
import { successResponse } from "../utils/response.js";


export const CreateAccountController = async (req, res, next) => {
    console.log("HIT");
    try {
        const { userId } = req.params;
        const account = await createAccount(userId);
        const responseBody = {
            account
        };
        successResponse(res, responseBody, 200);
    } catch(error) {
        next(error);
    }
}