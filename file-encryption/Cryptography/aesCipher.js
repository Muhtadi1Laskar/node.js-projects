import crypto from "node:crypto";

function generateKey(key) {
    return crypto.pbkdf2Sync(key, "vault-salt", 100000, 32, "sha256");
}

function encrypt(text, cipherKey) {
    const key = generateKey(cipherKey);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(data, cipherKey) {
    const key = generateKey(cipherKey);
    const [ivHex, encryptedHex] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
}

export {
    encrypt,
    decrypt
};