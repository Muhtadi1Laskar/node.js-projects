import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import singupModel from "../models/users.model.js";
import { ApiError } from "../utils/error.js";

export const signup = async ({ email, phone, firstName, lastName, password, role }) => {
    const existing = await singupModel.findOne({ email });
    if (existing) throw new ApiError(409, "User with this email already exists");

    const payload = {
        email
    };
    const activationToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await singupModel.create({
        email,
        phone,
        firstName,
        lastName,
        role,
        password: encryptedPassword,
        isActive: false,
        activationToken
    });
    const activationLink = `http://localhost:8080/api/activate/?email=${email}&token=${activationToken}`

    await user.save();

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        link: activationLink
    };
}