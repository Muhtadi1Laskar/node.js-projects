import { writeResponse } from "../utils/utils.js";

async function createMerkleController(res, reqBody) {
    writeResponse(res, { message: "Hello Bitch" });
    return;
}

export {
    createMerkleController
};