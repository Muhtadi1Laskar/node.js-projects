import { parseReqBody, writeResponse } from "../Common/common.js";
import { encrypt } from "../password-manager/password.js";

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
            writeResponse(res, { "hex": encryptedPassword });
        }
    },
    {
        method: 'GET',
        path: '/password/retrive',
        handler: async (req, res) => {
            const data = await parseReqBody(req);
        }
    }

];

export default routes;