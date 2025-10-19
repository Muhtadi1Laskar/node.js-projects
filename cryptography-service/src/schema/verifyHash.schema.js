import Joi from "joi";

export const verifyHashSchema = Joi.object({
    data: Joi.string().required(),
    algorithm: Joi.string().required(),
    hash: Joi.string().required()
})