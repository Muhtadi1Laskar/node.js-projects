import { randomBytes, randomUUID, createHash } from "node:crypto";
import { ApiError } from "./error.js";

export const generateActivationToken = () => {
    return randomBytes(32).toString("hex");
}

export const generateUUID = () => {
    return randomUUID();
}

export const hashData = (data) => {
    try {
        if (!data) throw new ApiError(400, "No data provived for hashing");
        return createHash("sha256")
            .update(data)
            .digest("hex");
    } catch (error) {
        return error.message;
    }
}