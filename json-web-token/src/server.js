import http from "node:http";
import crypto from "node:crypto";
import url from "node:url";


const JWT_SECRET = "THis_IS_SecRET";
const PORT = process.env.PORT || 8080;
const ALGORITHM = "HS256";

const base64urlEncode = (data) => {
    return Buffer.from(data)
        .toString("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const base64urlDecode = (data) => {
    let padded = data + "===".slice(0, (4 - (data.length % 4)) % 4);
    return Buffer.from(padded.replace(/-/g, '+')
        .replace(/_/g, '/'), 'base64')
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
        alg: ALGORITHM,
        typ: 'JWT'
    };

    const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
    payload.exp = expiration;

    const encodedHeader = base64urlEncode(JSON.stringify(header));
    const encodedPayload = base64urlEncode(JSON.stringify(payload));
    const tokenParts = `${encodedHeader}.${encodedPayload}`;
    const signature = signToken(tokenParts, secret);

    return `${tokenParts}.${signature}`;
}

const verifyJWT = (token, secret) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("Invalid token format");
            throw new Error("Invalid token format");
        }

        const [encodedHeader, encodedPayload, signature] = parts;
        const tokenParts = `${encodedHeader}.${encodedPayload}`;

        const expectedSignature = signToken(tokenParts, secret);

        const recievedSigBuffer = Buffer.from(signature);
        const expectedSigBuffer = Buffer.from(expectedSignature);

        if (recievedSigBuffer.length !== expectedSigBuffer.length ||
            !crypto.timingSafeEqual(recievedSigBuffer, expectedSigBuffer)) {
            console.error('Signature verification failed.');
            throw new Error('Signature verification failed.');
        }

        const payloadStr = base64urlDecode(encodedPayload);
        const payload = JSON.parse(payloadStr);

        const now = Math.floor(Date.now() / 1000);
        if (payload.exp < now) {
            console.error("Token expired");
            throw new Error("Token expired");
        }

        return payload;
    } catch (error) {
        throw new Error(error);
    }
}


const data = {
    name: "Luffy",
    id: 42343543405,
    occupation: "Pirate"
};

const token = createJWT(data, JWT_SECRET);
const payload = verifyJWT(token, JWT_SECRET)

console.log(token);
console.log(payload);