import pool from "../config/db.js";

const createrUserTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;

    try {
        await pool.query(queryText);
        console.log("User table created if not existed");
    } catch (error) {
        console.error("Failed to create user table: ", error.message);
        throw error;
    }
}

export default createrUserTable;