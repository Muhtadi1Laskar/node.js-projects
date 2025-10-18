import { makeNote } from "../controllers/note.controller.js";
import { login, registerUser } from "../controllers/user.controller.js";
import { loginSchema } from "../schema/loginSchema.js";
import { noteSchema } from "../schema/noteSchema.js";
import { registerSchema } from "../schema/registerSchema.js";

const routes = {
    "POST:/register": {
        controller: registerUser,
        schema: registerSchema
    },
    "POST:/login": {
        controller: login,
        schema: loginSchema
    },
    "POST:/make-note": {
        controller: makeNote,
        schema: noteSchema
    }
};

export default routes;