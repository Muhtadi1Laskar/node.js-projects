import crypto from "node:crypto";

function generateKey(bits, type, cipherAlgorithm, passphrase = "PASSPHRASE") {
    const validPrivateTypes = ["pkcs1", "pkcs8"];
    const validCiphers = crypto.getCiphers();

    if (typeof bits !== "number" || bits < 1024) {
        return {
            error: "Invalid key length. Must be a number >= 1024."
        };
    }

    if (!validPrivateTypes.includes(type)) {
        return {
            error: `Invalid private key type '${type}'. Valid options: ${validPrivateTypes.join(", ")}`
        };
    }

    if (!validCiphers.includes(cipherAlgorithm)) {
        return {
            error: `Invalid cipher algorithm '${cipherAlgorithm}'. Use one of: ${validCiphers.slice(0, 20).join(", ")} ...`
        };
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

function signMessage(message, signatureAlgorithm, outputEncoding, privateKeyString, passPhrase) {
    const error = checkForErrors(signatureAlgorithm, outputEncoding);

    if (error) {
        return error;
    }

    const cleanPrivateKeyString = privateKeyString.replace(/\\n/g, "\n");

    if (!isValidPrivateKey(cleanPrivateKeyString, passPhrase)) {
        return {
            error: "Invalid private key"
        };
    }

    try {
        const privateKey = crypto.createPrivateKey({
            key: cleanPrivateKeyString,
            passphrase: passPhrase
        });

        const signer = crypto.createSign(signatureAlgorithm);
        signer.update(message);
        signer.end();

        const signature = signer.sign(privateKey, outputEncoding);
        console.log(signature);
        return { signature };
    } catch (error) {
        console.error(error.message);
        return error;
    }

}

function verifyMessage(signature, message, signatureAlgorithm, publicKeyString, encodingType) {
    const error = checkForErrors(signatureAlgorithm, encodingType);

    if (error) {
        return error;
    }

    const cleanPublicKeyString = publicKeyString.replace(/\\n/g, "\n");

    if (!isValidPublicKey(cleanPublicKeyString)) {
        return {
            error: "Invalid Public Key"
        };
    }

    try {
        const publicKey = crypto.createPublicKey(cleanPublicKeyString);
        const verifier = crypto.createVerify(signatureAlgorithm);
        verifier.update(message);

        const isVerified = verifier.verify(publicKey, signature, encodingType);
        return { isVerified };
    } catch (error) {
        console.error(error);
        return error;
    }
}

function checkForErrors(signatureAlgorithm, encodingType) {
    const validEncodingTypes = ["hex"];
    const validAlgorithms = crypto.getHashes().filter(hash => hash.includes("RSA-"));

    if (!validEncodingTypes.includes(encodingType)) {
        return {
            error: `${encodingType} is not supported. Supported encodings: ${validEncodingTypes.join(', ')}`
        };
    }

    if (!validAlgorithms.includes(signatureAlgorithm)) {
        return {
            error: `Invalid signature algorithm. Use one of: ${validAlgorithms.join(', ')}`
        };
    }
}

const isValidPublicKey = (publicKey) => {
    try {
        const keyObject = crypto.createPublicKey(publicKey);
        return keyObject.type === "public" && keyObject.asymmetricKeyType === "rsa";
    } catch (error) {
        console.error("Key validation error: ", error.message);
        return error;
    }
}

const isValidPrivateKey = (key, passphrase) => {
    try {
        const privateKey = crypto.createPrivateKey({ key, passphrase });
        const dataToSign = Buffer.from("test data");
        const signature = crypto.sign("sha256", dataToSign, privateKey);
        const publicKey = crypto.createPublicKey(privateKey);
        const isVerified = crypto.verify("sha256", dataToSign, publicKey, signature);

        return isVerified;
    } catch (error) {
        console.error("Invalid RSA Private Key: ", error.message);
        return false;
    }
}

export {
    generateKey,
    signMessage,
    verifyMessage
};
