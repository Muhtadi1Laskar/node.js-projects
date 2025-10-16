import { createServer } from "node:http";
import { Wallet } from "ethers";


const PORT = process.env.PORT || 8080;

const server = createServer((req, res) => {
    const wallet = Wallet.createRandom();
    const response = {
        walletAddress: wallet.address,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        mnemonic: wallet.mnemonic.phrase
    };
    
    res.statusCode = 200;
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(response));
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});