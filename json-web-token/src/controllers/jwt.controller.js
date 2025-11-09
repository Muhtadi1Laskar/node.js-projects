import { createJWT, verifyJWT } from "../services/jwt.services.js";
import { writeResponse } from "../utils/utils.js";

export async function generateJWTController(res, req) {
    const {
        data,
        secretKey
    } = req;

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
        const isValidToken = verifyJWT(token, secretKey);
        writeResponse(res, { isValidToken });
    } catch (error) {
        writeResponse(res, { message: error });
    }
}