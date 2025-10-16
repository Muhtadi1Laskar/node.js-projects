import { writeResponse } from "../utils/utils.js";

export default async function signMessageController(res, body) {
    const {
        message,
        signatureAlgorithm,
        outputEncoding,
        privateKey,
        passPhrase
    } = body;

    const { error, signature } = signMessage(message, signatureAlgorithm, outputEncoding, privateKey, passPhrase);

    if(error) {
        writeResponse(res, {
            message: error
        });
        return;
    }

    writeResponse(res, {
        signature
    });
    return;
}