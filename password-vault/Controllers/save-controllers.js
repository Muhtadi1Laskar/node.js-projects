import { encrypt } from "../password-manager/password.js";
import { writeJSON, writeResponse } from "../Common/common.js";

export default async function savePasswordController(data, res) {
	const { site, username, password } = data;

    if(!site || !username || !password) {
        return "Invalid request body";
    }

    const encryptedData = encrypt(password);
    const finalData = {
        site, 
        username, 
        password: encryptedData
    };
    
    await writeJSON(finalData);

    writeResponse(res, { hex: encryptedData });
}