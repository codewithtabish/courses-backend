import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// neon: This is used to connect to your Neon PostgreSQL instance via HTTP.
const sql = neon(process.env.DRIZZLE_DATABASE_URL!);

// drizzle(sql): This initializes Drizzle ORM with the connection.
export const db = drizzle(sql);
