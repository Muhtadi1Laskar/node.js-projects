import { createJWT, verifyJWT } from "../services/jwt.services.js";
import { writeResponse } from "../utils/utils.js";

export async function generateJWTController(res, req) {
    const {
        data,
        secretKey
    } = req;

    if(Array.isArray(data)) {
        writeResponse(res, { message: "Data must be an object" });
        return;
    }

    try {
        const token = createJWT(data, secretKey);
        writeResponse(res, { token });
    } catch (error) {
        writeResponse(res, { message: error });
    }
}

export async function verifyJWTController(res, req) {
    const {
        token,
        secretKey
    } = req;

    try {
        const payload = verifyJWT(token, secretKey);
        writeResponse(res, { payload });
    } catch (error) {
        writeResponse(res, { message: error });
    }
}