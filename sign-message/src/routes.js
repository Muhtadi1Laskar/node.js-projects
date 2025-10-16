import generateKeyController from "./controllers/generateKeyController.js";
import keySchema from "./schema/keysSchema.js";
import signSchema from "./schema/signSchema.js";
import verifySchema from "./schema/verifySchema.js";

const routes = {
    "POST:/generateKey": {
        controller: generateKeyController,
        schema: keySchema,
    },
    "POST:/sign-message": {
        controller: '',
        schema: signSchema,
    },
    "POST:/verify-messsage": {
        controller: '',
        schema: verifySchema,
    }
};

export default routes;