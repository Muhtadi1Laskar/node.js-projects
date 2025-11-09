import { generateJWTController, verifyJWTController } from "../controllers/jwt.controller.js";
import { generateJWTSchema, verifyJWTSchmea } from "../schema/jwt.schema.js";

export const router = {
    "POST:/jwt/create": {
        controller: generateJWTController,
        schema: generateJWTSchema
    },
    "POST:/jwt/verify": {
        controller: verifyJWTController,
        schema: verifyJWTSchmea
    }
};