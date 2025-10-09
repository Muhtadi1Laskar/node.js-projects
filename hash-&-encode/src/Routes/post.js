import { parseResponse } from "../Common/common.js";
import { hashController } from "../Controllers/hash-controller.js";

export default async function postRoute(req, res) {
    switch (req.url) {
        case "/hash":
            const reqBody =  await parseResponse(req);
            await hashController(res, reqBody);
            break;
        case "/encoding":
            break;
        default:
            break;
    }
}