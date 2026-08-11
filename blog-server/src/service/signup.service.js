import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { generateActivationToken, generateUUID } from "../utils/utils.js";
import { ApiError } from "../../../test-data-tracker/src/utils/error.js";

export const signup = async ({ email, phone, firstName, lastName, passwords, roles }) => {
    const isActive = false;
    const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)';
    const res = await pool.query(query, [email]);
    const existing = res.rows[0].exists;

    if (existing) throw new ApiError(409, "User already exists with the given email");

    const tokenId = generateUUID();
    const tokenSecret = generateActivationToken();
    const hashedSecret = await bcrypt.hash(tokenSecret, 10);

    const encryptedPassword = await bcrypt.hash(passwords, 10);
    const activationExpiryDate = Date.now() + 3600000;

    const user = await pool.query(
        "INSERT INTO users (firstName, lastName, phone, email, roles, passwords, isActive, activationTokenId, activationTokenHash, activationTokenExpiry) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [firstName, lastName, phone, email, roles, passwords, isActive, tokenId, hashedSecret, activationExpiryDate]
    );
    const activationLink = `${process.env.ACTIVATION_URL}/${tokenSecret}/${tokenSecret}`;
    const { firstname, lastname } = user.rows[0];

    return {
        firstName: firstname,
        lastName: lastname,
        link: activationLink
    };
}

export const activateUser = async (token) => {
    const queryDate = Date.now();
    const query = 'SELECT * FROM users WHERE activationtokenexpiry > $1';
    const response = await pool.query(query, [queryDate]);
    const user = response.rows[0];

    console.log(response.rows);

    if(!user) throw new ApiError(401, "Invalid or expired activation link");

    console.log(user);

    return null;
}


export const getAllUser = async () => {
    const query = "SELECT firstname, lastname, email, phone FROM users";
    const result = await pool.query(query);

    if(!result) throw new ApiError(405, "Failed to call database to retrive all users");

    const users = result.rows.length > 0 ?  result.rows : { message: "The database is empty" };

    return users;
}