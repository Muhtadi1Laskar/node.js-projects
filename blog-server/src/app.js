import express from "express";
import cors from "cors";
import helmet from "helment";
import { errorHandler } from "../middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

export default app;