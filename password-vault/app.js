import { createServer, get, request } from "node:http";
import routes from "./routes/route.js";
import { matchRoute } from "./Common/common.js";

const PORT = process.env.PORT || 8080;


const server = createServer(async (req, res) => {
    const parsedURL = new URL(req.url, `http://${req.headers.host}`);
    const route = routes.find(r => r.method === req.method && matchRoute(parsedURL.pathname, r.path));

    if (!route) {
        res.writeHead(404, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Not Found' }));
    }

    const params = matchRoute(parsedURL.pathname, route.path);
    const result = route.handler(req, res, params);

});

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});