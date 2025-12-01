import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
});

export default SignupSchema;