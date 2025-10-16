import generateKeyController from "./controllers/generateKeyController.js";
import signMessageController from "./controllers/signMessageController.js";
import verifyMessageController from "./controllers/verifyMessageController.js";
import keySchema from "./schema/keysSchema.js";
import signSchema from "./schema/signSchema.js";
import verifySchema from "./schema/verifySchema.js";

const routes = {
    "POST:/generateKey": {
        controller: generateKeyController,
        schema: keySchema,
    },
    "POST:/sign-message": {
        controller: signMessageController,
        schema: signSchema,
    },
    "POST:/verify-message": {
        controller: verifyMessageController,
        schema: verifySchema,
    }
};

export default routes;