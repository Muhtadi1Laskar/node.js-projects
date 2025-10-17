import { signMessage } from "../utils/signMessage.js";
import { successResponse } from "../utils/response.js";

async function signMessageController(req, res) {
    const {message, privateKey } = req.body;
    const signature = await signMessage(message, privateKey);

    successResponse(res, { signature }, 200);
}

export default signMessageController;