import crypto from "node:crypto";

function generateKey(key) {
    return crypto.pbkdf2Sync("MASTERPASSWORD", "vault-salt", 100000, 32, "sha256");
}

function encrypt(text, cipherKey) {
    const key = generateKey(cipherKey);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export {
    encrypt
};