import { readJSON, writeResponse } from "../Common/common.js";
import { decrypt } from "../password-manager/password.js";

export default async function readPasswordController(res) {
    const data = await readJSON();

    const newData = data.map(res => {
        const encryptedData = decrypt(res.password);
        return {
            site: res.site,
            username: res.username,
            password: encryptedData
        }
    });

    writeResponse(res, newData);
}