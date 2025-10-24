import crypto from "node:crypto";
import { writeResponse } from "../utils/utils.js";
import IdenticonGenerator from "../services/identicon.service.js";

export const generateIdenticon = async (res, body) => {
    const { data, hash } = body;
    const hashes = crypto.getHashes();

    if(!hashes.includes(hash)) {
        writeResponse(res, {
            message: `Invalid hash algorithm. Use one of the following: ${hashes.join(', ')}`
        }, 404);
        return;
    }

    if(data.length === 0) {
        writeResponse(res, {
            message: "Data cannot be empty string"
        }, 404);
        return;
    }

    try {
        const identicon = new IdenticonGenerator(data, {
            hashAlgorithm: hash
        });
        const base64String = await identicon.generate();
        writeResponse(res, { base64String }, 200);
        return;
    } catch (error) {
        writeResponse(res, { message: error.message }, 404);
        return;
    }
} 