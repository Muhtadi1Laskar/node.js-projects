import { ethers } from "ethers";

async function verifyMessages(message, signature, address) {
    const recoveredAddress = ethers.verifyMessage(message, signature);

    return recoveredAddress.toLowerCase() === address.toLowerCase();
}

export default verifyMessages;