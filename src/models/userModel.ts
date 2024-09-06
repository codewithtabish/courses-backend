import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { z } from "zod";

// Define the User table
export const Users = pgTable("users", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  username: varchar("username", { length: 255 }).notNull(), // Username column, varchar type
  email: varchar("email", { length: 255 }).notNull().unique(), // Email column, must be unique
  password: varchar("password", { length: 255 }).notNull(), // Hashed password storage
  isActive: boolean("is_active").default(true), // Boolean to check if the user is active
  createdAt: timestamp("created_at").defaultNow().notNull(), // Timestamp for creation
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Timestamp for updates
});
