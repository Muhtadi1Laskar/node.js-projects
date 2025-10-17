import { verifyMessage } from "ethers";
import { successResponse } from "../utils/response.js";
import verifyMessages from "../utils/verifyMessage.js";

async function verifyMessageController(req, res) {
    const { message, signatrue, address } = req.body;

    const isValid = await verifyMessages(message, signatrue, address);

    successResponse(res, { isValid }, 200);
}

export default verifyMessageController;