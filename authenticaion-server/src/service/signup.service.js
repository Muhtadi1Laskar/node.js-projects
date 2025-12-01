import singupModel from "../models/users.model.js";

export const signup = async ({ email, phone, firstName, lastName, password }) => {
    const timestamp = new Date().toISOString();

    const existing = await singupModel.findOne({ email });
    if (existing) throw new Error("User with this email already exists");

    const user = await singupModel.create({
        email,
        phone,
        firstName,
        lastName,
        password
    });

    await user.save();

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
    };
}