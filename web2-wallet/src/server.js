import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

dotenv.config({ path: join(_dirname, "../.env") });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});