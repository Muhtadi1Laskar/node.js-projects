import Joi from "joi";
import crypto from "node:crypto";

const HASHES = crypto.getHashes();

export const hashDataSchema = Joi.object({
    algorithm: Joi.string()
        .valid(...HASHES)
        .required()
        .messages({
            "any.required": "Hash algorithm is required",
            "any.only": `Invalid hash algorithm. Use one of: ${HASHES.join(', ')}`
        }),

    data: Joi.string()
        .required()
        .messages({
            "any.required": "Dta field is required",
            "string.empty": "Data cannot be empty"
        })
});

export const verifyHashSchema = Joi.object({
    algorithm: Joi.string()
        .valid(...HASHES)
        .required()
        .messages({
            "any.required": "Hash algorithm is required",
            "any.only": `Invalid hash algorithm. Use one of: ${HASHES.join(', ')}`
        }),

    data: Joi.string()
        .required()
        .messages({
            "any.only": "Data must be a string",
            "any.required": "Data to verify is required",
        }),

    hash: Joi.string()
        .pattern(/^[a-fA-F0-9]+$/)
        .required()
        .messages({
            "any.required": "Hash string is required",
            "string.pattern.base": "Hash must be a valid hex string"
        })
});


export const multipleHashSchema = Joi.object({
    algorithms: Joi.array()
        .items(Joi.string().valid(...HASHES))
        .min(1)
        .required()
        .messages({
            "array.min": "Provide at least one algorithm",
            "any.required": "Algorithms array is required"
        }),

    data: Joi.string()
        .required()
        .messages({
            "any.required": "Data field is required"
        })
});