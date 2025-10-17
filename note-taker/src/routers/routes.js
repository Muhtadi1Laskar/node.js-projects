import { login, registerUser } from "../controllers/user.controller.js";
import { loginSchema } from "../schema/loginSchema.js";
import { registerSchema } from "../schema/registerSchema.js";

const routes = {
    "POST:/register": {
        controller: registerUser,
        schema: registerSchema
    },
    "POST:/login": {
        controller: login,
        schema: loginSchema
    }
};

export default routes;