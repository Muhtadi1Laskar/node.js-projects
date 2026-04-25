import express from "express";
import cors from "cors";
import helment from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import router from "./router/index.js";

const app = express();

app.use(cors());
app.use(helment());
app.use("./api", router);

app.use("/api", router);
app.use(errorHandler);

export default app;