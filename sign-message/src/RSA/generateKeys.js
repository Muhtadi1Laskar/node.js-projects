import crypto from "node:crypto";

function generateKey(bits, type, cipherAlgorithm, passphrase = "PASSPHRASE") {

    const validPrivateTypes = ["pkcs1", "pkcs8"];
    const validCiphers = crypto.getCiphers(); // returns all supported cipher names

    if (typeof bits !== "number" || bits < 1024) {
        return { error: "Invalid key length. Must be a number >= 1024." };
    }

    if (!validPrivateTypes.includes(type)) {
        return { error: `Invalid private key type '${type}'. Valid options: ${validPrivateTypes.join(", ")}` };
    }

    if (!validCiphers.includes(cipherAlgorithm)) {
        return { error: `Invalid cipher algorithm '${cipherAlgorithm}'. Use one of: ${validCiphers.slice(0, 20).join(", ")} ...` };
    }

    try {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: bits,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type,
                format: 'pem',
                cipher: cipherAlgorithm,
                passphrase
            }
        });
        return { publicKey, privateKey };
    } catch (error) {
        return { error: error };
    }
}

export { generateKey };
