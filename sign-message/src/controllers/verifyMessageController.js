import { writeResponse } from "../utils/utils.js";

export default async function verifyMessageController(res, body) {
    const {
        signature,
        signatureAlgorithm,
        outputType
    } = body;

    const { error, isValid } = verifyMessage(signature, signatureAlgorithm, publicKey, outputType);

    if (error) {
        writeResponse(res, {
            message: error
        });
        return;
    }

    writeResponse(res, {
        isValid
    });

    return;
}