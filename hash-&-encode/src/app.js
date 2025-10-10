import { createServer } from "node:http";
import unifiedHandler from "./RequestHandler/unifiedHandler.js";

const PORT = process.env.PORT || 8080;

const server = createServer(unifiedHandler);

server.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});