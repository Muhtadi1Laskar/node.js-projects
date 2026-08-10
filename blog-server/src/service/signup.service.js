import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { generateActivationToken } from "../utils/utils.js";
import { ApiError } from "../../../test-data-tracker/src/utils/error.js";

export const signup = async ({ email, phone, firstName, lastName, passwords, roles }) => {
    const isActive = false;
    const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)';
    const res = await pool.query(query, [email]);
    const existing = res.rows[0].exists;

    if (existing) throw new ApiError(409, "User already exists with the given email");

    const plainToken = generateActivationToken();
    const hashedToken = await bcrypt.hash(plainToken, 10);

    const encryptedPassword = await bcrypt.hash(passwords, 10);
    const activationExpiry = Date.now() + 3600000;

    const user = await pool.query(
        "INSERT INTO users (firstName, lastName, phone, email, roles, passwords, isActive, activationToken) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [firstName, lastName, phone, email, roles, passwords, isActive, hashedToken]
    );
    const activationLink = `${process.env.ACTIVATION_URL}/${plainToken}`;
    const { firstname, lastname } = user.rows[0];

    return {
        firstName: firstname,
        lastName: lastname,
        link: activationLink
    };
}

export const activateUser = async (token) => {
    return;
}


export const getAllUser = async () => {
    const query = "SELECT firstname, lastname, email, phone FROM users";
    const result = await pool.query(query);

    if(!result) throw new ApiError(405, "Failed to call database to retrive all users");

    const users = result.rows.length > 0 ?  result.rows : { message: "The database is empty" };

    return users;
}