import { encrypt } from "../password-manager/password.js";
import { writePassword, writeResponse } from "../Common/common.js";

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
    
    await writePassword(JSON.stringify(finalData));

    writeResponse(res, { hex: encryptedData });
}