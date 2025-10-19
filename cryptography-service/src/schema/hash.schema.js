import joi from "joi";

export const hashSchema = joi.object({
    algorithm: joi.string().required(),
    data: joi.string().required()
});