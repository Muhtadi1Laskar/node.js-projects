import { parseReqBody, writePassword, writeResponse } from "../Common/common.js";
import { decrypt, encrypt } from "../password-manager/password.js";

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (req, res) => (writeResponse(res, "Welcome to Password Vault"))
    },
    {
        method: 'POST',
        path: '/password/add',
        handler: async (req, res) => {
            const data = await parseReqBody(req);
            const encryptedPassword = encrypt(data.password, data.key);
            writePassword(JSON.stringify({ "hex": encryptedPassword }));
            writeResponse(res, { "hex": encryptedPassword });
        }
    },
    {
        method: 'GET',
        path: '/password/retrive',
        handler: async (req, res) => {
            const data = await parseReqBody(req);
            const decryptedPassword = decrypt(data.hex);
            writeResponse(res, { "password": decryptedPassword });
        }
    }

];

export default routes;