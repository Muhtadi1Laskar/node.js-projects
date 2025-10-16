import { generateKey } from "../RSA/generateKeys.js";
import { writeResponse } from "../utils/utils.js";

async function generateKeyController(res, reqBody) {
    const { bits, format, cipherAlgorithm, passPhrase } = reqBody;

    if(bits <= 511) {
        writeResponse(res, {
            message: "Bits must be greater than 511"
        });
        return;
    }

    const { publicKey, privateKey } = generateKey(bits, format, cipherAlgorithm, passPhrase);
    const responseBody = {
        message: "Successfully generated the keys",
        publicKey,
        privateKey
    };

    writeResponse(res, responseBody);
    return;
}

export default generateKeyController;