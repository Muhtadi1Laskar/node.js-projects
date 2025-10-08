import { writeResponse } from "../Common/common.js";
import { decrypt, encrypt } from "../Cryptography/aesCipher.js";

export default async function fileUploadController(res, fields, files) {
    const { key, operation } = fields;
    const plainText = files.fileData.content.toString();
    let data = '';

    switch (operation) {
        case "encrypt":
            data = encrypt(plainText, key);
            break;
        case "decrypt":
            data = decrypt(plainText, key);
            break
        default:
            data = "Didn't work";
    }

    writeResponse(res, { data: data });
}