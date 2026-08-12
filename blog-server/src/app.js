import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.routes.js";
import createUserTable from "./data/createUserTable.js";
import createPostTable from "./data/createPosts.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

createUserTable();
createPostTable();

export default app;