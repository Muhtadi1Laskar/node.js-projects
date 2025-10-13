import { createServer } from "node:http";

const PORT = process.env.PORT || 8080;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World" }));
});


server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});