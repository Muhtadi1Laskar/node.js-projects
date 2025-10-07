import { parseReqBody, writeResponse } from "../Common/common.js";

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (req, res) => (writeResponse(res, "Welcome to Password Vault"))
    },
    {
        method: 'GET',
        path: '/password/names',
        handler: async (req, res) => {
            const data = await parseReqBody(req);
            writeResponse(res, data);
        }
    }

];

export default routes;