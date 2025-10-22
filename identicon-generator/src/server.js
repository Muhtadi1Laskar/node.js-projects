import { createServer } from "node:http";

const PORT = 8080;

const server = createServer((req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ "message": "Hello World" }));
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})