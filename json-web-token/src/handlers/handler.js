import { router } from "../routers/router.js";
import { writeResponse } from "../utils/utils.js";

export const handler = async (req, res) => {
    const { url, method } = req;
    const endpoint = `${method}:${url}`;
    const route = router[endpoint];

    if (!route) {
        writeResponse(res, { message: "Invalid endpoint" }, 404);
        return;
    }

}