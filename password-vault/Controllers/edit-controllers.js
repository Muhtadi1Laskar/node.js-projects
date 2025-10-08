import { readJSON, writeResponse } from "../Common/common.js";
import { decrypt } from "../password-manager/password.js";

export default async function editPasswordController(res, req) {
    const data = await readJSON();
    const { site, name } = req;

    if (data.length === 0) {
        writeResponse(res, { message: "There are no saved passwords" });
        return;
    }

    const filteredPassword = data.filter(elem => elem.site === site && elem.username === name);

    if(filteredPassword.length === 0) {
        writeResponse(res, { message: "There are no saved password with the given information" });
        return;
    }

    const finalData = filteredPassword.map(elem => {
        const encryptedPassword = decrypt(elem.password);
        return {
            site: elem.site,
            username: elem.username,
            password: encryptedPassword
        };
    });

    writeResponse(res, finalData);
}