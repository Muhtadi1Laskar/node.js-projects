import { createServer } from "node:http";
import { identiconHandler } from "./handler/identicon.handler.js";

const PORT = 8080;

const server = createServer(identiconHandler);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`); ``
});