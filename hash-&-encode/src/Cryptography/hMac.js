import crypto from "node:crypto";

function hmac(data, key) {
    try {
        return crypto.createHmac("sha512", key)
            .update(data)
            .digest("base64");
    } catch (error) {
        return error.message;
    }
}

export {
    hmac
};