import crypto from "node:crypto";

function generateKey(bits, type, cipherAlgorithm, passphrase = "PASSPHRASE") {
    const publicKey = {
        type: 'spki',
        format: 'pem'
    };

    const privateKey = {
        type,
        format: 'pem',
        cipher: cipherAlgorithm,
        passphrase
    };

    return crypto.generateKeyPairSync("rsa", {
        modulusLength: bits,
        privateKeyEncoding: privateKey,
        publicKeyEncoding: publicKey
    }, (err) => err.message);
}

export {
    generateKey
};