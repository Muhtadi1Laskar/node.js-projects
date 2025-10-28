import crypto from "crypto";

const base64urlEncode = (data) => {
    return Buffer.from(data)
        .toString("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const base64urlDecode = (data) => {
    let padded = data + "===".slice(0, (4 - (data.length % 4)) % 4);
    return Buffer.from(padded.replace(/-/, '+')
        .replace(/_/g, '/'), "base64")
        .toString('utf8');
}

const signToken = (tokenParts, secret) => {
    return crypto.createHmac("sha256", secret)
        .update(tokenParts)
        .digest("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const createJWT = (payload, secret) => {
    const header = {
        alg: "HS256",
        type: "JWT"
    };

    const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
    payload.exp = expiration;

    const encodedHeader = base64urlEncode(JSON.stringify(header));
    const encodedPayload = base64urlEncode(JSON.stringify(payload));
    const tokenParts = `${encodedHeader}.${encodedPayload}`;
    const signature = signToken(tokenParts, secret);

    return `${tokenParts}.${signature}`;
}