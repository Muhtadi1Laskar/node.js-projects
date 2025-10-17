import { successResponse } from "../utils/response";
import { signMessage } from "../utils/signMessage.js";

async function verifyMessageController(req, res) {
    const { message, signatrue, address } = req.body;

    const isValid = signMessage(message, signatrue, address);

    successResponse(res, { isValid }, 200);
}

export default verifyMessageController;