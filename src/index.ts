import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { testConnection } from "./config/dbConnection";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import z from "zod";

const app = express();
const PORT = process.env.PORT || 15000;

// middleware to parese json

app.use(express.json());

testConnection().catch((err) => {
  console.log("The Database connection error is ->", err);
  process.exit(1);
});

// Http requests

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello Node js server with ts config ...",
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// Error-handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes
  console.error("Unexpected error:", error);

  // Check for Zod validation errors
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.errors,
    });
  }

  // Handle common HTTP errors
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      message: error.message || "An error occurred",
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    // Optionally include error details in development environment
    details: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
