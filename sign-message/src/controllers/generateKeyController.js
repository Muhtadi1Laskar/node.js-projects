import { writeResponse } from "../utils/utils.js";

async function generateKeyController(res, reqBody) {
    const { bits, format, cipherAlgorithm, passPhrase } = reqBody;

    if(bits < 511) {
        writeResponse(res, {
            message: "Bits must be greater than 511"
        });
        return;
    }

    
}