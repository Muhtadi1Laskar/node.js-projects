import { generateKey } from "../RSA/generateKeys.js";
import { writeResponse } from "../utils/utils.js";

async function generateKeyController(res, reqBody) {
    const {
        bits,
        format,
        cipherAlgorithm,
        passPhrase
    } = reqBody;

    const {
        error,
        publicKey,
        privateKey
    } = generateKey(bits, format, cipherAlgorithm, passPhrase);

    if (error) {
        writeResponse(res, { error });
        return
    }

    const responseBody = {
        message: "Successfully generated the keys",
        publicKey,
        privateKey
    };

    writeResponse(res, responseBody);
    return;
}

export default generateKeyController;