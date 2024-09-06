import express from "express";
import { getAllUsers } from "../controller/userController";

const userRoute = express.Router();

userRoute.get("/", getAllUsers);

export default userRoute;
