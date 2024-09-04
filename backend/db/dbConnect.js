import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "3435",
  host: "localhost",
  port: "5432",
  database: "daily_goals",
});
