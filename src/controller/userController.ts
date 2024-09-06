import { Request, Response } from "express";
import { db } from "../config/db";
import { Users } from "../models/userModel";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await db.select().from(Users);
    res.status(200).json({ success: true, users: allUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
