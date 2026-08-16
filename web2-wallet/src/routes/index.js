import express from "express";
import userRouter from "./users.routes.js";
import accountRouter from "./account.routes.js";
import transferRouter from "./transfer.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/transfer", transferRouter);

export default router;