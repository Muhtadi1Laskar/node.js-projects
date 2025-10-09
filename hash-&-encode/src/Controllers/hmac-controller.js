import { writeResponse } from "../Common/common.js";
import { hmac } from "../Cryptography/hMac.js";

async function hmacController(res, reqBody) {
    const { data, key } = JSON.parse(reqBody || {});

    const missingFields = [];
    if (!data) missingFields.push("data");
    if (!key) missingFields.push("key");

    if (missingFields.length > 0) {
        writeResponse(res, {
            message: `Missing required field(s): ${missingFields.join(", ")}`
        });
        return;
    }

    const result = hmac(data, key);

    writeResponse(res, {
        hmac: result
    });
}

export {
    hmacController
};