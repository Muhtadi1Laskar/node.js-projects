import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import singupModel from "../models/users.model.js";
import { ApiError } from "../utils/error.js";

export const login = async ({ email, password }) => {
    const savedUser = await singupModel.findOne({ email });

    if (!savedUser || !(await bcrypt.compare(password, savedUser.password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    const payload = {
        user: {
            id: savedUser._id
        }
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );

    return {
        message: "Login successful",
        token
    };
}