import { generateJWTController } from "../controllers/jwt.controller.js";

export const router = {
    "POST:/jwt/create": {
        contorller: generateJWTController,
        schema: ''
    },
    "POST:/jwt/verify": {
        controller: '',
        schema: ''
    }
};