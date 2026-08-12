import { ApiError } from "../utils/error.js"
import { hashData } from "../utils/utils.js";
import pool from "../config/db.js";


export const createPost = async ({ title, content, userId, tags }) => {
    const insertQuery = "INSERT INTO posts (userid, title, content, tags, contentHash) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const contentHash = hashData(content + title);

    const databaseResponse = await pool.query(
        insertQuery, 
        [userId, title, content, tags, contentHash]
    );
    const post = databaseResponse.rows[0];

    if(!post) throw new ApiError(400, "Failed to create the post");

    return {
        postID: post.postid,
        content: post.content,
        title: post.title,
        createdAt: post.createdat, 
        updatedAt: post.updatedat
    };
}