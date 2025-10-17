import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { errorResponse } from "./response.js";

const validateSchema = (body, schema) => {
    const errors = [];
    const parsedBody = typeof body === "string" ? JSON.parse(body) : body;

    for (const key in schema) {
        if (!parsedBody.hasOwnProperty(key)) {
            errors.push(`Missing field(s): ${key}`);
            continue;
        }

        const expectedType = schema[key];
        const actualType = typeof parsedBody[key];

        if (expectedType !== actualType) {
            errors.push(`Field '${key}' should be of type '${expectedType}', got '${actualType}'`);
        }
    }

    if (errors.length > 0) {
        return {
            valid: false,
            message: errors.join('; ')
        }
    }
    return {
        valid: true,
        data: parsedBody
    }
}

const generateID = () => {
    let objectIdCounter = Math.floor(Math.random() * 0xfffff);

    const time = Math.floor(Date.now() / 1000).toString(16);
    const timeHex = time.padStart(8, '0');
    const randomHex = crypto.randomBytes(5).toString('hex');

    objectIdCounter = (objectIdCounter + 1) % 0x1000000;

    const counterHex = objectIdCounter.toString(16).padStart(6, '0');

    return timeHex + randomHex + counterHex;
}

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


export const checkTokenValidity = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        errorResponse(res, {
            message: "Authorization header missing"
        }, 401);
        return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        errorResponse(res, {
            messsage: 'Authorization format must be "Bearer [token]".'
        }, 401);
        return;
    }
    const token = parts[1];
    const decoded = jwt.verify(token, "This is the key");

    if (!decoded || !decoded.id) {
        errorResponse(res, {
            message: 'Invalid or expired token'
        }, 401);
        return
    }

    return decoded.id;
}

export {
    validateSchema,
    generateID,
    isValidEmail
};