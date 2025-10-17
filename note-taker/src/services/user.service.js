import bcrypt from 'bcrypt';
import { writeJSON } from '../utils/database.js';
import { generateID } from '../utils/utils.js';

export async function createUser({ name, email, password }) {
    const ID = generateID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userBody = {
        id: ID,
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