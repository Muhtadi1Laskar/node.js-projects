import { createServer } from "node:http";
import routes from "./routes/route.js";
import { matchRoute } from "./Common/common.js";

const PORT = process.env.PORT || 8080;

const server = createServer(async (req, res) => {
    const parsedURL = new URL(req.url, `http://${req.headers.host}`);
    const route = routes.find(r => r.method === req.method && matchRoute(parsedURL.pathname, r.path));

    if(route) {
        await route.handler(req, res);
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});