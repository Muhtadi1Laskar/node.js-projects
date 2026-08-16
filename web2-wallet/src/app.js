import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/index.js";
import createUserTable from "./data/createUserTable.js";
import { errorHandler } from "./middleware/errorHandler.js";
import createAccountTable from "./data/createAccountTable.js";
import createTransferTable from "./data/createTransferTable.js";
import { successResponse } from "./utils/response.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);
app.use(errorHandler);

app.get("/check-health", async (req, res, next) => {
    try {
        const responseBody = {
            message: "The endpoint is live and working"
        };
        successResponse(res, responseBody, 200);
    } catch(error) {
        console.error("Failed to hit the endpoint: ", error.message);
        throw error;
    }
});

createUserTable();
createAccountTable();
createTransferTable();

export default app;