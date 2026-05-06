import { pool } from "./db.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function initDb() {
  try {
    const sql = readFileSync(join(__dirname, "../database/init.sql"), "utf8");
    await pool.query(sql);
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ DB init error:", err.message);
  }
}
