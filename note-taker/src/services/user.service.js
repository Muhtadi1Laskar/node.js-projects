import bcrypt from 'bcrypt';
import { findOne, findUser, readJSON, writeJSON } from '../utils/database.js';
import { generateID } from '../utils/utils.js';
import { errorResponse } from '../utils/response.js';

export async function createUser({ name, email, password }) {
    const isRegistered = await findUser({ email });

    if (isRegistered.length > 0) {
        throw new Error("Email already exists");
    }

    const ID = generateID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userBody = {
        id: ID,
        name,
        email,
        hashedPassword,
        isActive: true
    };

    try {
        await writeJSON("users", userBody);

        return {
            message: "Successfully created the user account"
        };
    } catch (error) {
        throw new Error(error);
    }
}

export async function authenticateUser({ email, password }) {
    const user = await findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
        throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
        throw new Error("User is not active");
    }

    return generateID();
}

