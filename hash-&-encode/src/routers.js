import { getListController, hashController } from "./Controllers/hash-controller.js";
import { hmacController } from "./Controllers/hmac-controller.js";

const routes = {
    "GET:/hash/list": getListController,
    "POST:/hash": hashController,
    "POST:/hmac": hmacController
};

export default routes;