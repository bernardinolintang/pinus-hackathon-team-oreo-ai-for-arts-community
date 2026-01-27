const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const conn = process.env.DATABASE_URL || process.env.PGURI;
if (!conn) {
  console.error("ERROR: DATABASE_URL or PGURI environment variable not set.");
  console.error("Set it to your PostgreSQL connection string, e.g.:");
  console.error('  export DATABASE_URL="postgresql://user:password@localhost:5432/artful"');
  process.exit(1);
}

const pool = new Pool({ connectionString: conn });

async function setup() {
  const client = await pool.connect();
  try {
    const schemaPath = path.join(__dirname, "../db/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await client.query(schema);
    console.log("✅ Database schema created successfully");
  } catch (e) {
    console.error("❌ Error setting up schema:", e.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
