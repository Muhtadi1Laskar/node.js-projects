import { createJWT } from "../services/jwt.services.js";
import { writeResponse } from "../utils/utils";

export async function generateJWTController(res, req) {
    const {
        data,
        secretKey
    } = req;

    try {
        const token = createJWT(data, secretKey);
        writeResponse(res, { token });
    } catch (error) {
        writeResponse(res, { error });
    }
}