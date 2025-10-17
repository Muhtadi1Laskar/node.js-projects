import bcrypt from 'bcrypt';
import { writeJSON } from '../utils/database.js';

export async function createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userBody = {
        name,
        email,
        hashedPassword
    };

    try {
        await writeJSON("users", userBody);

        return {
            message: "Successfully created the user account"
        };
    } catch (error) {
        return {
            error
        };
    }
}