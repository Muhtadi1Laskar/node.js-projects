import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    role: { type: String, required: true },
    activationToken: { type: String, rrequired: true },
    activationTokenExpiry: Date
}, {
    timestamps: true
});

const userModel = mongoose.model("user", UserSchema);

export default userModel;