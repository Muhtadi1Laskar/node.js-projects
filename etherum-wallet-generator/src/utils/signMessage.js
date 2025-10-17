import { Wallet } from "ethers";

async function signMessage(message, privateKey) {
    const wallet = new Wallet(privateKey);
    try {
        const signature = await wallet.signMessage(message);
        return signature;
    } catch (error) {
        return error;
    }
}

export {
    signMessage
};