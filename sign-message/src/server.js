import { createServer } from "node:http";
import handlers from "./handler/handlers.js";

const PORT = process.env.PORT || 8080;

const server = createServer(handlers);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
