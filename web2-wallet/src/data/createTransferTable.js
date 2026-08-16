import pool from "../config/db.js";

const createTransferTable = async () => {
    const queryText = `
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";

        CREATE TABLE IF NOT EXISTS transfers (
            transfer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            sender_account_id UUID REFERENCES accounts(account_id),
            receiver_account_id UUID REFERENCES accounts(account_id),
            amount REAL,
            createdAt TIMESTAMP DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_transfers_transfer_id ON transfers(transfer_id);
    `;

    try {
        await pool.query(queryText);
        console.log("\nTransfer table created");
    } catch (error) {
        console.error("Failed to create transfer table", error.message);
        throw error;
    }
}

export default createTransferTable;