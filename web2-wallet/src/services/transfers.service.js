import pool from "../config/db.js";
import { ApiError } from "../utils/error.js";
import { generateID } from "../utils/utils.js";


export const createTransfer = async ({ senderUserId, receiverUserId, senderAccountId, receiverAccountId, amount }) => {
    const queryText = `
        WITH sender_account AS (
            SELECT EXISTS(SELECT 1 FROM accounts WHERE user_id = $1) AS sender_exists
        ),
        receiver_account AS (
            SELECT EXISTS(SELECT 1 FROM accounts WHERE user_id = $2) AS receiver_exists
        )
        SELECT 
            sender_exists,
            receiver_exists
        FROM sender_account, receiver_account;
    `;
    const result = await pool.query(queryText, [senderUserId, receiverUserId]);
    const { sender_exists, receiver_exists } = result.rows[0];

    console.log(result.rows[0]);

    if (!sender_exists) throw new ApiError(404, "Sender account doesn't exists");
    if (!receiver_exists) throw new ApiError(404, "Receiver account doesn't exists");

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        console.log("Indside the block");
        
        const sendQuery = 
        `UPDATE accounts
         SET balance = balance - $1
         WHERE user_id = $2
         AND balance >= $1
         RETURNING balance
        `;

        const updateResult = await client.query(
            sendQuery,
            [amount, senderUserId]
        );

        if (updateResult.rows.length === 0) {
            throw new ApiError(400, "Insufficient funds or invalid user Id");
        }

        const receiveQuery = 
        `UPDATE accounts
         SET balance = balance + $1
         WHERE user_id = $2
        `;

        await client.query(
            receiveQuery,
            [amount, receiverUserId]
        );

        const transferId = generateID();
        const transferQuery = `
            INSERT INTO 
            transfers (transfer_id, sender_account_id, receiver_account_id, amount)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const transferResponse = await client.query(
            transferQuery,
            [transferId, senderAccountId, receiverAccountId, amount]
        );

        if (transferResponse.rows.length === 0) {
            throw new ApiError(409, "Failed to created transfer receipt");
        }

        await client.query('COMMIT');

        return {
            newBalance: updateResult.rows[0].balance,
            trasferInfo: transferResponse.rows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}