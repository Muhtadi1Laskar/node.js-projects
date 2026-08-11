import { randomBytes, randomUUID } from "crypto";

export const generateActivationToken = () => {
    return randomBytes(32).toString("hex");
}

export const generateUUID = () => {
    return randomUUID();
}