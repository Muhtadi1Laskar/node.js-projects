import { ethers } from "ethers";

async function verifyMessage(message, signature, address) {
    const recoveredAddress = ethers.verifyMessage(message, signature);

    return recoveredAddress.toLowerCase() === address.toLowerCase();
}

export default verifyMessage;