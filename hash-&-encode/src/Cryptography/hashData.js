import crypto from "node:crypto";

const hashData = (data, algorithm) => {
    try {
        if (!data) {
            return "No data provided for hashing";
        }
        const hashFunction = crypto.createHash(algorithm);

        hashFunction.update(data);

        const hashDigest = hashFunction.digest("hex");
        return hashDigest;
    } catch (error) {
        return error.message;
    }
}

export default hashData;