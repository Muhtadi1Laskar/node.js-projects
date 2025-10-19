import crypto from "node:crypto";

export const generateHmac = (data, secretKey, hash) => {
    try {
        return crypto.createHmac(hash, secretKey)
            .update(data)
            .digest("hex");
    } catch (error) {
        throw new Error(error);
    }
}

export const verifyHmac = (data, secretKey, recievedHmac, hash) => {
    const hmac = crypto.createHmac(hash, secretKey)
        .update(data)
        .digest("hex");
    const isVerified = crypto.timingSafeEqual(
        Buffer.from(hmac),
        Buffer.from(recievedHmac)
    );

    return isVerified;
}