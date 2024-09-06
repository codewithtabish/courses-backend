import {
  pgTable,
  text,
  integer,
  decimal,
  serial,
  boolean,
} from "drizzle-orm/pg-core";

export const Courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Price of the course
  isPaid: boolean("is_paid").notNull().default(false), // Indicates if the course is paid
});
