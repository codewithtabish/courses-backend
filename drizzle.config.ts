import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/models/combinedSchema.ts", // Adjust path to your schema file
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DB_URL ||
      "postgresql://neondb_owner:UfiBlEI8m9Kj@ep-young-glade-a5g256v3.us-east-2.aws.neon.tech/node-js-courses?sslmode=require",
  },
  verbose: true,
  strict: true,
});
