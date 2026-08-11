import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";


    CREATE TABLE IF NOT EXISTS users (
        userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        phone INT NOT NULL UNIQUE,
        roles VARCHAR(10) NOT NULL,
        passwords VARCHAR(256) NOT NULL,
        isActive BOOLEAN NOT NULL DEFAULT FALSE, 
        activationTokenId VARCHAR(36) NOT NULL,
        activationTokenHash VARCHAR(255) NOT NULL,
        activationTokenExpiry BIGINT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
    `;
    try {
        await pool.query(queryText);
        console.log("User table created if not existed");
    } catch (error) {
        console.error("Error created user table", error.message);
        throw error;
    }
}

export default createUserTable;