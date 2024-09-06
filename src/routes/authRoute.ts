import express from "express";
import { loginController, signupContoller } from "../controller/authController";

const authRoute = express.Router();

authRoute.post("/signup", signupContoller);
authRoute.post("/login", loginController);

export default authRoute;
