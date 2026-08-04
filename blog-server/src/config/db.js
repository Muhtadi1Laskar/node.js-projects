import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DBPORT
});


pool.on("Connected to PostgreSQL database", () => {
    console.log("Connection pool established with database");
});

export default pool;