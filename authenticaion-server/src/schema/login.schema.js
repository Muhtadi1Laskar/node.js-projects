import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: true } })
        .lowercase()
        .required()
        .messages({
            "string.email": "Must be a valid email address",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(8)
        .max(128)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password cannot exceed 128 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'any.required': 'Password is required'
        }),
});