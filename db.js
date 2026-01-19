// db.js (ESM version)

console.log("DATABASE_URL raw:", process.env.DATABASE_URL);
console.log("DB_SSL raw:", process.env.DB_SSL);


import pg from "pg";
const { Pool } = pg;

const url = new URL(process.env.DATABASE_URL);
console.log("Parsed username:", url.username);
console.log("Parsed password:", url.password);
console.log("Parsed host:", url.hostname);
console.log("Parsed port:", url.port);
console.log("Parsed database:", url.pathname);

// Connection pool configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true"
    ? { rejectUnauthorized: false }
    : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Retry wrapper for queries
async function retryQuery(queryText, params, retries = 3) {
  try {
    console.log("DB QUERY:", queryText, params);

    const start = Date.now();
    const result = await pool.query(queryText, params);
    const duration = Date.now() - start;

    console.log(`DB RESPONSE: ${duration}ms, rows: ${result.rowCount}`);

    return result;

  } catch (err) {
    console.error("DB ERROR:", err.message);

    if (retries > 0) {
      console.warn(`Retrying query... attempts left: ${retries}`);
      return retryQuery(queryText, params, retries - 1);
    }

    throw err;
  }
}

// Handle unexpected pool errors
pool.on("error", (err) => {
  console.error("Unexpected PG Pool Error", err);
});

// Export in ESM format
export default {
  query: (text, params) => retryQuery(text, params),
  pool
};

console.log("DATABASE_URL:", process.env.DATABASE_URL);