import { hashFunction, verifyHashData } from "../services/hash.service.js";
import { successResponse } from "../utils/response.js";

export const hashData = async (req, res, next) => {
    try {
        const hash = hashFunction(req.body);
        successResponse(res, { hash }, 200);
    } catch (error) {
        next(error);
    }
}

export const verifyHash = async (req, res, next) => {
    console.log(req.body);
    try {
        const isSame = verifyHashData(req.body);
        successResponse(res, { isSame }, 200);
    } catch (error) {
        next(error);
    }
}