import pool from "../config/db.js";
import { ApiError } from "../utils/error.js";


export const createAccount = async ({ userId, firstName, lastName }) => {
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
        INSERT INTO accounts (user_id, first_name, last_name, balance)
        VALUES ($1, $2, $3, 0) 
        RETURNING *
    `;
    const newAccount = await pool.query(
        accountCreateQuery,
        [userId, firstName, lastName]
    );

    return newAccount.rows[0];
}

export const updateBalance = async ({ userId, amount }) => {
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
        FROM user_check, account_check
    `;
    const result = await pool.query(queryText, [userId]);
    const { user_exists, account_exists } = result.rows[0];

    if (!user_exists) throw new ApiError(404, "User does not exists");
    if (!account_exists) throw new ApiError(404, "Account does not exists");

    const balanceQuery = `
        UPDATE accounts 
        SET balance = balance + $1
        WHERE user_id = $2
        RETURNING balance;
    `;
    const updateBalance = await pool.query(
        balanceQuery,
        [amount, userId]
    );

    if (updateBalance.rows[0].length === 0) {
        throw new ApiError(409, "Failed to update the balance");
    }

    return updateBalance.rows[0];
}

export const checkBalance = async (userId) => {
    const queryText = `
        SELECT EXISTS
        (SELECT 1 FROM accounts WHERE user_id = $1)
    `;
    const existsResponse = await pool.query(queryText, [userId]);

    if (!existsResponse.rows[0].exists) {
        throw new ApiError(404, "Account doesn't exists");
    }

    const searchQuery = `
        SELECT * FROM accounts WHERE user_id = $1;
    `;
    const searchResult = await pool.query(searchQuery, [userId]);

    return searchResult.rows[0];
}