import bcrypt from 'bcrypt';
import { readJSON, writeJSON } from '../utils/database.js';
import { generateID } from '../utils/utils.js';

export async function createUser({ name, email, password }) {
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
    
    if(!user || !(await bcrypt.compare(password, user.hashedPassword))) {
        throw new Error("Invalid credentials");
    }
    
    if(!user.isActive) {
        throw new Error("User is not active");
    }

    return generateID();
}

export async function findUser(query) {
    const userData = await readJSON("users");
    const keys = Object.keys(query);

    const matchingUsers = userData.filter(user => {
        return keys.every(key => {
            return user[key] === query[key];
        });
    });
    return matchingUsers;
}

export async function findOne(query) {
    const data = await findUser(query);
    return data[0];
}