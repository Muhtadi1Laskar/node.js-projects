import pool from "../config/db.js";
import { ApiError } from "../utils/error.js";


export const createAccount = async (userId) => {
    const queryText = `
        WITH user_check AS (
            SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1) AS user_exists
        ),
        account_check AS (
            SELECT EXISTS(SELECT 1 FROM accounts WHERE user_id = $1) AS account_exists
        )
        SELECT
            user_exists,
            account_exists
        FROM user_check, account_check;
    `;
    const result = await pool.query(queryText, [userId]);
    const { user_exists, account_exists } = result.rows[0];

    if (!user_exists) throw new ApiError(404, "User does not exists");

    if (account_exists) throw new ApiError(409, "User account already exists!");

    const accountCreateQuery = `
        INSERT INTO accounts (user_id, balance)
        VALUES ($1, 0) 
        RETURNING *
    `;
    const newAccount = await pool.query(accountCreateQuery, [userId]);

    return newAccount.rows[0];
}