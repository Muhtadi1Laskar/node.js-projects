import { ApiError } from "../utils/error.js"
import { hashData } from "../utils/utils.js";
import pool from "../config/db.js";


export const createPost = async ({ title, content, userId, tags }) => {
    const insertQuery = `
        INSERT INTO 
        posts (userid, title, content, tags, contentHash) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const contentHash = hashData(content + title);

    const databaseResponse = await pool.query(
        insertQuery,
        [userId, title, content, tags, contentHash]
    );
    const post = databaseResponse.rows[0];

    if (!post) throw new ApiError(400, "Failed to create the post");

    return {
        postID: post.postid,
        content: post.content,
        title: post.title,
        createdAt: post.createdat,
        updatedAt: post.updatedat
    };
}

export const updatePost = async (userId, postId, updatedData) => {
    const allowedFields = ["title", "content", "tags"];
    const keys = Object.keys(updatedData).filter(key => allowedFields.includes(key));

    if (keys === 0) throw new ApiError(400, "No valid fields provided to update");

    const fieldsToUpdateStr = keys.map((elem, index) => {
        return `${elem} = $${index + 1}`
    }).join(', ');


    const valuesArray = keys.map(key => updatedData[key]);
    const totalFields = keys.length;
    const queryForUpdate = `
        UPDATE posts 
        SET ${fieldsToUpdateStr} 
        WHERE userid = $${totalFields + 1} AND postid = $${totalFields + 2}
    `;

    const result = await pool.query(queryForUpdate, [...valuesArray, userId, postId]);

    if (result.rowCount === 0) throw new ApiError(200, "Failed to update the post");

    return "Successfully updated the post";
}

export const deletePost = async (userId, postId) => {
    const checkUserQuery = `
        SELECT
        EXISTS(SELECT 1 FROM posts WHERE userid = $1 AND postid = $2)
    `;
    const response = await pool.query(checkUserQuery, [userId, postId]);
    const existing = response.rows[0].exists;

    if (!existing) throw new ApiError(409, "Post doesn't exists");

    const deleteQuery = `
        DELETE 
        FROM posts 
        WHERE userid = $1 AND postid = $2;
    `;
    const deleteResponse = await pool.query(deleteQuery, [userId, postId]);

    if(deleteResponse.rowCount === 0) throw new ApiError(200, "Failed to delete the post");

    return postId;
}