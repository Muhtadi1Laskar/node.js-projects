import { createServer } from "node:http";
import handler from "./handlers/handler.js";

const PORT = process.env.PORT || 8080;

const server = createServer(handler);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});