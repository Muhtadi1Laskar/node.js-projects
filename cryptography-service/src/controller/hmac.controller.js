import { generateHmac, verifyHmac } from "../services/hmac.service.js";
import { successResponse } from "../utils/response.js";

export const getHmac = async (req, res, next) => {
    const { data, secretKey, hash } = req.body;

    try {
        const hmac = generateHmac(data, secretKey, hash);
        successResponse(res, { hmac }, 200);
    } catch(error) {
        next(error);
    }
}

export const checkHmac = async (req, res, next) => {
    const { data, secretKey, hmac, hash } = req.body;

    try {
        const isVerified = verifyHmac(data, secretKey, hmac, hash);
        successResponse(res, { isVerified }, 200);
    } catch(error) {
        next(error)
    }
}