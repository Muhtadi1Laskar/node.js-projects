import crypto from "crypto";

const base64urlEncode = (data) => {
    return Buffer.from(data)
        .toString("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const base64urlDecode = (data) => {
    let padded = data + "===".slice(0, (4 - (data.length % 4)) % 4);
    return Buffer.from(padded.replace(/-/, '+')
        .replace(/_/g, '/'), "base64")
        .toString('utf8');
}

