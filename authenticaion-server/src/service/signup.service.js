import bcrypt from "bcrypt";
import singupModel from "../models/users.model.js";
import { ApiError } from "../utils/error.js";

export const signup = async ({ email, phone, firstName, lastName, password, role }) => {
    const existing = await singupModel.findOne({ email });
    if (existing) throw new ApiError(409, "User with this email already exists");

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await singupModel.create({
        email,
        phone,
        firstName,
        lastName,
        role,
        password: encryptedPassword,
        isActive: false
    });

    await user.save();

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
    };
}