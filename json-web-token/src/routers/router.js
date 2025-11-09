import { generateJWTController } from "../controllers/jwt.controller.js";
import { generateJWTSchema, verifyJWTSchmea } from "../schema/jwt.schema.js";

export const router = {
    "POST:/jwt/create": {
        contorller: generateJWTController,
        schema: generateJWTSchema
    },
    "POST:/jwt/verify": {
        controller: '',
        schema: verifyJWTSchmea
    }
};