import express from "express";
import cookieParser from "cookie-parser";
import {
  getUsers,
  userLogin,
  authUser,
  userLogout,
  getUser,
} from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const userRouter = express.Router(); // ROUTER OBJECT

userRouter.use(cookieParser()); // MIDDLEWARE TO READ/EXTRACT COOKIES FROM CLIENT

userRouter.get("/getusers", getUsers);
userRouter.post("/login", userLogin); // LOGIN API
userRouter.get("/logout", userLogout); // LOGOUT API

// VERIFY/AUTHENTICATE USER API
userRouter.get("/verifyuser", verifyUser, authUser);

// GET USER DETAILS API
userRouter.get("/userdetails", verifyUser, getUser);
