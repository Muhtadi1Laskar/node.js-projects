import { generateIdenticon } from "../controllers/identicon.controller.js";
import { identiconSchema } from "../schema/identicon.schema.js";

const router = {
    "POST:/generate-identicon": {
        controller: generateIdenticon,
        schema: identiconSchema
    }
};

export default router;