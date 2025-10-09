import { decodeData, encodeData } from "../Cryptography/encoder.js";
import { writeResponse } from "../Common/common.js";

async function encodeController(res, reqBody) {
    const { data } = reqBody;
    const encodedStr = encodeData(data);

    writeResponse(res, {
        encodedString: encodedStr
    });
}

async function decodeController(res, reqBody) {
    const { data } = reqBody;
    const decodedStr = decodeData(data);

    writeResponse(res, {
        decodedString: decodedStr
    });
}

export {
    encodeController,
    decodeController
};