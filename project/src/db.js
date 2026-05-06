import pg from "pg";
const { Pool } = pg;

// Render provee DATABASE_URL como connection string
// También soportamos variables individuales para desarrollo local
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // requerido en Render
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });

export { pool };
