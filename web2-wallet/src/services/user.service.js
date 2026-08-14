import pool from "../config/db.js";
import { ApiError } from "../utils/error.js";


export const createUser = async ({ firstName, lastName, email }) => {
    const userExistQuery = `
        SELECT
        EXISTS(SELECT 1 FROM users WHERE email = $1);
    `;
    const res = await pool.query(userExistQuery, [email]);
    const userExists = res.rows[0].exists;

    if (userExists) throw new ApiError(409, "User already exists with the given email");

    const insertQuery = `
        INSERT INTO
        users (first_name, last_name, email)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const user = await pool.query(
        insertQuery,
        [firstName, lastName, email]
    );
    const { first_name, last_name } = user.rows[0];

    return {
        firstName: first_name,
        lastName: last_name
    };
}