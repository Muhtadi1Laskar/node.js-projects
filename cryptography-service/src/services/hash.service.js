import crypto from "node:crypto";

export const hashFunction = ({ data, algorithm }) => {
    try {
        return crypto.createHash(algorithm)
            .update(data)
            .digest("hex")
    } catch (error) {
        throw new Error(error);
    }
}

export const verifyHashData = ({ data, hash, algorithm }) => {
    try {
        const newHash = hashFunction({ data, algorithm });
        return hash === newHash;
    } catch (error) {
        throw new Error(error);
    }
}