import { parseReqBody, writeResponse } from "../Common/common.js";
import readPasswordController from "../Controllers/read-controllers.js";
import savePasswordController from "../Controllers/save-controllers.js";

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (req, res) => {
            writeResponse(res, { message: "Welcome to Password Vault" });
        }
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
        path: '/password/retrive/all',
        handler: async (req, res) => {
            await readPasswordController(res);
        }
    }

];

export default routes;