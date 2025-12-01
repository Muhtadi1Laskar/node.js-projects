import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, './.env') });

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port: ${PORT}`);
    });
});