import { deleteNoteById, getAllNotes, makeNote, updateNotes } from "../controllers/note.controller.js";
import { login, registerUser } from "../controllers/user.controller.js";
import { deleteSchema } from "../schema/deleteNoteSchema.js";
import { loginSchema } from "../schema/loginSchema.js";
import { noteSchema } from "../schema/noteSchema.js";
import { registerSchema } from "../schema/registerSchema.js";
import { updateSchema } from "../schema/updateSchema.js";

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
    },
    "GET:/all-notes": {
        controller: getAllNotes
    },
    "PUT:/update-notes": {
        controller: updateNotes,
        schema: updateSchema
    },
    "DELETE:/delete-note": {
        controller: deleteNoteById,
        schema: deleteSchema
    }
};

export default routes;