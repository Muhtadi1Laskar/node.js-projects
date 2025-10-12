import { createServer } from "node:http";
import merkleHandler from "./handler/merkleHandler.js";

const PORT = process.env.PORT || 8080;

const server = createServer(merkleHandler);


server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});