import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const mongoDBURL = "mongodb://localhost:27017/";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBURL);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};
