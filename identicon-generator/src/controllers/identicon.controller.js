import crypto from "node:crypto";
import { writeResponse } from "../utils/utils.js";
import IdenticonGenerator from "../services/identicon.service.js";

export const generateIdenticon = async (req, res) => {
    const { data, hash } = req.body;
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
        const identiconBase64String = await identicon.generate();
        writeResponse(200, { identiconBase64String }, 200);
        return;
    } catch (error) {
        writeResponse(res, { message: error.message }, 404);
        return;
    }
} 