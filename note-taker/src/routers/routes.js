import registerUser from "../controllers/user.controller.js";
import { registerSchema } from "../schema/registerSchema.js";

const routes = {
    "POST:/register": {
        controller: registerUser,
        schema: registerSchema
    },
    "POST:/login": {
        controller: "",
        schema: ""
    }
};

export default routes;