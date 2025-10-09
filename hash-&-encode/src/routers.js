import { encodeController } from "./Controllers/encode-decode-controller.js";
import { getListController, hashController } from "./Controllers/hash-controller.js";
import { hmacController } from "./Controllers/hmac-controller.js";
import encoderSchema from "./Schema/encoderSchema.js";
import hashSchema from "./Schema/hashSchema.js";
import hmacSchema from "./Schema/hmacSchema.js";

const routes = {
    "GET:/hash/list": {
        controller: getListController,
        schema: null
    },
    "POST:/hash": {
        controller: hashController,
        schema: hashSchema
    },
    "POST:/hmac": {
        controller: hmacController,
        schema: hmacSchema
    },
    "POST:/encode": {
        controller: encodeController,
        schema: encoderSchema
    }
};

export default routes;