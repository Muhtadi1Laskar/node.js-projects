import { parseReqBody, writeResponse } from "../Common/common.js";
import savePasswordController from "../Controllers/save-controllers.js";
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
            await savePasswordController(data, res);
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