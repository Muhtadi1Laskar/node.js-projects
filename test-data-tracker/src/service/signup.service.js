import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { ApiError } from "../utils/error.js";
import { generateActivationToken } from "../utils/utls.js";

export const signup = async ({ email, phone, firstName, lastName, password, role }) => {
    const existing = await userModel.findOne({ email });
    if (existing) throw new ApiError(409, "User already existis");

    const plainToken = generateActivationToken();
    const hashedToken = await bcrypt.hash(plainToken, 10);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        email,
        phone,
        firstName,
        lastName,
        role,
        password: encryptedPassword,
        isActive: false,
        activationToken: hashedToken,
        activationTokenExpiry: Date.now() + 3600000
    });
    const activationLink = `${process.env.ACTIVATION_URL}/${plainToken}`;

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        link: activationLink
    };
}

export const activateUser = async (token) => {
    const user = await userModel.findOne({
        activationTokenExpiry: { $gte: Date.now() }
    });
    if (!user) {
        throw new ApiError(401, "Invalid or expired activation link");
    }

    const isMatch = await bcrypt.compare(token, user.activationToken);
    if (!isMatch) {
        throw new ApiError(400, "Invalid activation token");
    }

    user.isActive = true;
    user.activationToken = null;
    user.activationTokenExpiry = null;

    await user.save();

    return "Account activated successfully";
}