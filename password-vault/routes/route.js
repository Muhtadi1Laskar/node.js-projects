import { parseReqBody, writeResponse } from "../Common/common.js";
import editPasswordController from "../Controllers/edit-controllers.js";
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
    },
    {
        method: 'PUT',
        path: '/password/edit',
        handler: async (req, res) => {
            const data = await parseReqBody(req);
            await editPasswordController(res, data);
        }
    }

];

export default routes;