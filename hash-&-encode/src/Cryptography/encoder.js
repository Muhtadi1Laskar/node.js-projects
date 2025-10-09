const encode = (message) => {
    const bufferObj = Buffer.from(message, "utf-8");
    const base64String = bufferObj.toString("base64");
    return base64String;
}

const decode = (base64String) => {
    const bufferObj = Buffer.from(base64String, "base64");
    const decodedString = bufferObj.toString("utf-8");
    return decodedString;
}

export {
    encode,
    decode
};