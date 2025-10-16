import { verifyMessage } from "../RSA/generateKeys.js";
import { writeResponse } from "../utils/utils.js";

export default async function verifyMessageController(res, body) {
    const {
        message,
        signature,
        signatureAlgorithm,
        outputEncoding,
        publicKey
    } = body;

    const { error, isVerified } = verifyMessage(signature, message, signatureAlgorithm, publicKey, outputEncoding);

    if (error) {
        writeResponse(res, error);
        return;
    }

    writeResponse(res, {
        isVerified
    });

    return;
}