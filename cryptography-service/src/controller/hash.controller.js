import crypto from "node:crypto";
import { hashFunction, verifyHashData } from "../services/hash.service.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { isHexString } from "../utils/utils.js";

const HASHES = crypto.getHashes();

export const hashData = async (req, res, next) => {
    const { algorithm } = req.body;

    if (!HASHES.includes(algorithm)) {
        errorResponse(res, {
            message: `Invalid hash function. Try the following functions ${HASHES.join(', ')}`
        }, 401);
        return;
    }

    try {
        const hash = hashFunction(req.body);
        successResponse(res, { hash }, 200);
    } catch (error) {
        next(error);
    }
}

export const verifyHash = async (req, res, next) => {
    const { algorithm, hash } = req.body;

    if (!HASHES.includes(algorithm)) {
        errorResponse(res, {
            message: `Invalid hash function. Try the following functions ${HASHES.join(', ')}`
        }, 401);
        return;
    }

    if (!isHexString(hash)) {
        errorResponse(res, {
            message: "Invalid hash string"
        }, 401);
        return;
    }

    try {
        const isSame = verifyHashData(req.body);
        successResponse(res, { isSame }, 200);
    } catch (error) {
        next(error);
    }
}