import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        userID SERIAL PRIMARY key,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL,
        phone INT NOT NULL,
        roles VARCHAR(10) NOT NULL,
        passwords VARCHAR(30) NOT NULL,
        isActive BOOLEAN NOT NULL, 
        activationToken VARCHAR(255) NOT NULL,
        activationTokenExpiry BIGINT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
);
    `;
    try {
        pool.query(queryText);
        console.log("User table created if not existed");
    } catch (error) {
        console.error("Error created user table", error);
    }
}

export default createUserTable;