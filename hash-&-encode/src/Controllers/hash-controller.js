import { writeResponse } from "../Common/common.js";

export default async function hashController(res, reqBody) {
    const data = JSON.parse(reqBody);

    writeResponse(res, data);
}