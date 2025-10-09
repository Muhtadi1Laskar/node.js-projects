import crypto from "node:crypto";

const hashData = (data, algorithm) => {
    try {
        if (!data) {
            return "No data provided for hashing";
        }
        return crypto.createHash(algorithm)
            .update(data)
            .digest("hex");
    } catch (error) {
        return error.message;
    }
}

export default hashData;