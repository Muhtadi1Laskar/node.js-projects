import Joi from "joi";
import crypto from "node:crypto";

const HASHES = crypto.getHashes();

export const hmacSchema = Joi.object({
    data: Joi.string()
        .required()
        .messages({
            "any.required": "Data field is required",
            "string.empty": "Data cannot be empty"
        }),

    secretKey: Joi.string()
        .required()
        .messages({
            "string.empty": "secretKey cannot be empty",
            "any.required": "secretKey is a required field"
        }),

    hash: Joi.string()
        .valid(...HASHES)
        .required()
        .messages({
            "any.required": "Hash algorithm is required",
            "any.only": `Invalid hash algorithm. Use one of: ${HASHES.join(', ')}`
        }),
}).required().messages({ "any.required": "Payload is required" });

export const verifyHmacSchema = Joi.object({
    data: Joi.string()
        .required()
        .messages({
            "any.required": "Data field is required",
            "string.empty": "Data cannot be empty"
        }),

    secretKey: Joi.string()
        .required()
        .messages({
            "string.empty": "secretKey cannot be empty",
            "any.required": "secretKey is a required field"
        }),

    hash: Joi.string()
        .valid(...HASHES)
        .required()
        .messages({
            "any.required": "Hash algorithm is required",
            "any.only": `Invalid hash algorithm. Use one of: ${HASHES.join(', ')}`
        }),

    hmac: Joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "Hmac cannot be empty",
            "string.hex": "Hmac must be a hex string",
            "any.required": "hmac is a required field"
        })
}).required().messages({ "any.required": "Payload is required" });