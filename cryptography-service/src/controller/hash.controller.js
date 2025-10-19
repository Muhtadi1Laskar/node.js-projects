import crypto, { hash } from "node:crypto";
import { hashFunction, verifyHashData } from "../services/hash.service.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { isHexString } from "../utils/utils.js";

const HASHES = crypto.getHashes();

export const getAllHash = async (req, res, next) => {
    try {
        successResponse(res, {
            hashes: HASHES || [],
            totalFunctions: HASHES.length
        }, 200);
    } catch (error) {
        next(error);
    }
}

export const hashData = async (req, res, next) => {
    const { algorithm, data } = req.body;

    if (!HASHES.includes(algorithm)) {
        errorResponse(res, {
            message: `Invalid hash function. Try the following functions ${HASHES.join(', ')}`
        }, 400);
        return;
    }

    try {
        const hash = hashFunction(data, algorithm);
        successResponse(res, { hash }, 200);
    } catch (error) {
        next(error);
    }
}

export const verifyHash = async (req, res, next) => {
    const { algorithm, hash, data } = req.body;

    if (!HASHES.includes(algorithm)) {
        errorResponse(res, {
            message: `Invalid hash function. Try the following functions ${HASHES.join(', ')}`
        }, 401);
        return;
    }

    if (!isHexString(hash)) {
        errorResponse(res, {
            message: "Invalid hash string"
        }, 400);
        return;
    }

    try {
        const isSame = verifyHashData(data, hash, algorithm);
        successResponse(res, { isSame }, 200);
    } catch (error) {
        next(error);
    }
}

export const multipleHash = async (req, res, next) => {
    const { algorithms, data } = req.body;
    try {
        const results = algorithms.map(hash => {
            return !HASHES.includes(hash) ?
                { [hash]: 'Invalid Hash Function' } :
                { [hash]: hashFunction(data, hash) }
        });
        successResponse(res, { results }, 200);
    } catch (error) {
        next(error);
    }
}

export const hashFile = async (req, res, next) => {
    const { originalname, mimetype, buffer, size } = req.file;
    const algorithm = req.body.hash;
    const text = buffer.toString();
    
    try {
        const hash = hashFunction(text, algorithm);
        successResponse(res, { hash }, 200)
    } catch (error) {
        next(error)
    }
}