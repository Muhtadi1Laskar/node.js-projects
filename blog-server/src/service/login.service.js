import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../test-data-tracker/src/utils/error.js";
import pool from "../config/db.js";


export const login = async ({ email, password }) => {
    const queryToGetUser = "SELECT * FROM users WHERE email = $1";
    const response = await pool.query(queryToGetUser, [email]);
    const existingUser = response.rows[0];

    if (!existingUser) throw new ApiError(404, "User doesn't exists");

    if (!(await bcrypt.compare(password, existingUser.passwords))) {
        throw new ApiError(403, "Invalid password");
    }

    if (!existingUser.isactive) {
        throw new ApiError(403, "User is not activated. Please activate the account");
    }

    const payload = {
        user: {
            id: existingUser.userid
        }
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    return token;
}