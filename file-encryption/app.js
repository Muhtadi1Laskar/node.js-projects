import { createServer } from "node:http";

const PORT = process.env.PORT || 8080;

const server = createServer(async (req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
    console.log(`The server is running on the port: ${PORT}`);
});