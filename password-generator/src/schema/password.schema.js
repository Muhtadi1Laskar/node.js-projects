import Joi from "joi";

const types = ["lower", "upper", "digits", "symbols"];

export const passwordSchema = Joi.object({
    length: Joi.number()
        .integer()
        .min(4)
        .max(128)
        .required()
        .messages({
            "number.base": "Length must be a number",
            "number.integer": "Length must be an integer",
            "number.min": "Length must be at least 4",
            "number.max": "Length cannot exceed 128",
            "any.required": "Length is required"
        }),

    types: Joi.array()
        .items(Joi.string().valid('lower', 'upper', 'digits', 'symbols'))
        .min(1)
        .required()
        .messages({
            "array.base": "Types must be an array",
            "array.min": "At least one type must be selected",
            "any.required": "Types is required",
            "string.only": "Invalid type found. Use only: 'lower', 'upper', 'digits', 'symbols'"
        })

}).required().messages({ "any.required": "Payload is required" });


export const passphraseSchema = Joi.object({
    words: Joi.number()
        .required()
        .integer()
        .min(2)
        .max(10)
        .default(4)
        .messages({
            'any.required': 'Words is required',
            'number.base': 'Words must be a number',
            'number.integer': 'Words must be an integer',
            'number.min': 'Words must be at least 2',
            'number.max': 'Words cannot exceed 10'
        }),

    separator: Joi.string()
        .trim()
        .max(5)
        .default('-')
        .pattern(/^[^a-zA-Z0-9]*$/, 'non-alphanumeric')
        .messages({
            'string.max': 'Separator cannot exceed 5 characters',
            'string.pattern.name': 'Separator should not contain letters or numbers'
        }),

    capitalize: Joi.boolean()
        .default(false)
        .messages({
            'boolean.base': 'Capitalize must be true or false'
        }),

    addNumber: Joi.boolean()
        .default(false)
        .messages({
            'boolean.base': 'AddNumber must be true or false'
        })
}).options({ stripUnknown: true });

export const strengthSchema = Joi.object({
    password: Joi.string()
        .required()
        .messages({
            "any.required": "Password is required",
            "string.base": "Password must be a string",
            "string.empty": "Password cannot be empty"
        })
}).required().messages({ "any.required": "Payload is required" });