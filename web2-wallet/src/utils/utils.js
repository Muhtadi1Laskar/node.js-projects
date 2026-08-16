import crypto from "node:crypto";

export const generateID = () => crypto.randomUUID();