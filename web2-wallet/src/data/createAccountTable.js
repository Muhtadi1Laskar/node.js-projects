import pool from "../config/db.js";

const createAccountTable = async () => {
    const queryText = `
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";

        CREATE TABLE IF NOT EXISTS accounts (
            account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(user_id),
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20) NOT NULL,
            balance REAL NOT NULL,
            createdAt TIMESTAMP DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_accounts_account_id ON accounts(account_id);
        CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
    `;

    try {
        await pool.query(queryText);
        console.log("\nPost table created if not existed");
    } catch (error) {
        console.error("Failed to create post table", error.message);
        throw error;
    }
}

export default createAccountTable;