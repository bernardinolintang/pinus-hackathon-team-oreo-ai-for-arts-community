const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const conn = process.env.DATABASE_URL || process.env.PGURI;
if (!conn) {
  console.error("ERROR: DATABASE_URL or PGURI environment variable not set.");
  process.exit(1);
}

const pool = new Pool({ connectionString: conn });

async function seed() {
  const client = await pool.connect();
  try {
    const seedPath = path.join(__dirname, "../db/seed.sql");
    const seed = fs.readFileSync(seedPath, "utf8");
    await client.query(seed);
    console.log("✅ Database seeded successfully");
  } catch (e) {
    console.error("❌ Error seeding database:", e.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
