import { parseRequest, writeResponse } from "../Common/common.js";
import { hashController } from "../Controllers/hash-controller.js";
import { hmacController } from "../Controllers/hmac-controller.js";

export default async function postRoute(req, res) {
    const reqBody = await parseRequest(req);

    switch (req.url) {
        case "/hash":
            await hashController(res, reqBody);
            break;
        case "/encoding":
            break;
        case "/hmac":
            await hmacController(res, reqBody);
            break;
        default:
            writeResponse(res, { message: "Invalid endpoint" });
            break;
    }
}