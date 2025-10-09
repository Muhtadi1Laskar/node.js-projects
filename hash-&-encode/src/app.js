import { createServer } from "node:http";
import getRoute from "./Routes/get.js";
import postRoute from "./Routes/post.js";

const PORT = process.env.PORT || 8080;

const server = createServer(async (req, res) => {
    switch (req.method) {
        case "GET":
            await getRoute(req, res);
            break;
        case "POST":
            await postRoute(req, res);
            break;
        default:
            break;
    }
});

server.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
})