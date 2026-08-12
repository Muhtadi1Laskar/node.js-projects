import pool from "../config/db.js";

const createPostTable = async () => {
    const queryText = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS posts (
        postID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userID UUID REFERENCES users(userID),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[],
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP,
        contentHash CHAR(64) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_posts_title ON posts(title);
    CREATE INDEX IF NOT EXISTS idx_posts_postID ON posts(postID);
    CREATE INDEX IF NOT EXISTS idx_posts_userID ON posts(userID);
    `;

    try {
        await pool.query(queryText);
        console.log("Post table created if not existed");
    } catch (error) {
        console.error("Failed to create post table", error.message);
        throw error;
    }
};

export default createPostTable;