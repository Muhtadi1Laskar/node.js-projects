import crypto from "node:crypto";

const hashData = (data) => {
    return crypto.create("sha256").update(data).digest("hex");
}

export {
    hashData
};