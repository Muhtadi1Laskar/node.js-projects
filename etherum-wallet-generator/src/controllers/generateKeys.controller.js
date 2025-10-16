import { Wallet } from "ethers";
import { successResponse } from "../utils/response.js";

function generateKeys(req, res) {
    const wallet = Wallet.createRandom();
    const response = {
        walletAddress: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase || ""
    };
    successResponse(res, response, 200);
}

export default generateKeys;