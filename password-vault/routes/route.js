import { parseReqBody } from "../Common/common.js";

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async () => ({ message: "Welcome" })
    },
    {
        method: 'GET',
        path: '/password/names',
        handler: async (req, res) => {
            const data = await parseReqBody(req);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Data received successfully", data }));
        }
    }

];

export default routes;