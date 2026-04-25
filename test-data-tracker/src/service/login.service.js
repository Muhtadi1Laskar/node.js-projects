import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { ApiError } from "../utils/error.js";

export const login = async ({ email, password }) => {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
        throw new ApiError(404, "User doesn't exists");
    }

    if (!(await bycrypt.compare(password, existingUser.password))) {
        throw new ApiError(403, "Invalid password")
    }

    if (!existingUser.isActive) {
        throw new ApiError(403, "User is not activated. Please activate the account");

    }

    const payload = {
        user: {
            id: existingUser._id
        }
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );

    return token;
}