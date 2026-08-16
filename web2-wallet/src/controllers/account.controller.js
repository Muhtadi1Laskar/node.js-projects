import { createAccount, updateBalance } from "../services/account.service.js";
import { successResponse } from "../utils/response.js";


export const CreateAccountController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        req.body.userId = userId;

        const account = await createAccount(req.body);
        const responseBody = {
            account
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}

export const UpdateAccountBalanceController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        req.body.userId = userId;

        const balance = await updateBalance(req.body);
        const responseBody = {
            message: "Successfully updated the balance",
            balance
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}