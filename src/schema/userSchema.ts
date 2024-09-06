import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  //   password: z.string().min(6, "Password must be at least 6 characters long"),
});
