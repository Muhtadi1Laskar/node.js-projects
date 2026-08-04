import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import app from "./app.js";
import pool from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../.env") });

const PORT = process.env.PORT || 8080;

pool.listen()

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}\n`);
});