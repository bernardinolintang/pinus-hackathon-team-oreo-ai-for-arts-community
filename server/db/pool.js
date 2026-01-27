const { Pool } = require("pg");
require("dotenv").config();

let pool = null;

function getPool() {
  if (pool) return pool;
  const conn = process.env.DATABASE_URL || process.env.PGURI;
  if (!conn) {
    console.warn("DATABASE_URL / PGURI not set; artist API will return 503.");
    return null;
  }
  pool = new Pool({ connectionString: conn });
  return pool;
}

module.exports = { getPool };
