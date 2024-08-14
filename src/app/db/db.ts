import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,       // Your PostgreSQL username
  host: process.env.DB_HOST,       // The database host (e.g., 'localhost')
  database: process.env.DB_NAME,   // The name of your PostgreSQL database
  password: process.env.DB_PASSWORD, // Your PostgreSQL user's password
  port: Number(process.env.DB_PORT), // The port PostgreSQL is running on (5432 is default)
});

export default pool;
