import express from "express";
import SignupController, { ActivateController, RetriveAllUsersController } from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/", SignupController);
router.get("/activate/:tokenId/:tokenSecret", ActivateController);
router.get("/all-users", RetriveAllUsersController);

export default router;