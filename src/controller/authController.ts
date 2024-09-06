import { Request, Response } from "express";
import { db } from "../config/db";
import { Users } from "../models/userModel";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { loginUserSchema, registerUserSchema } from "../schema/userSchema";
import { z } from "zod";

export async function signupContoller(req: Request, res: Response) {
  try {
    const validateData = registerUserSchema.parse(req.body);
    const { email, password, username } = validateData;
    const userHashPassword = await hashPassword(password);

    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await db
      .insert(Users)
      .values({ username, email, password: userHashPassword })
      .returning({ id: Users.id });
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        userId: user,
      });
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error registering user:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const validData = await loginUserSchema.parse(req.body);
    const { email } = validData;
    const { password } = req.body;
    const user = await db.select().from(Users).where(eq(Users.email, email));
    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    console.log(user[0].password);
    const checkPassword = await comparePassword(password, user[0].password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
