import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { getUsers, userLogin, authUser, userLogout, getUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const userRouter = express.Router();    // ROUTER OBJECT

userRouter.use(cookieParser()); // MIDDLEWARE TO READ/EXTRACT COOKIES FROM CLIENT

userRouter.get("/getusers", getUsers);
userRouter.post("/login", userLogin); // LOGIN API
userRouter.get("/logout", userLogout); // LOGOUT API

// const verifyUser = (req,res, next) => {
//     const token = req.cookies.userSessionToken;
//     if(!token) {
//         return res.status(401).json({
//             success: false,
//             status: "fail",
//             message: "You are not authenticated"
//         });
//     } else {
//         jwt.verify(token, "jwt-secret-login-token", (err, decoded) => {
//             if (err) {
//                 return res.status(500).json({
//                     success: false,
//                     status: "fail",
//                     message: "Error verifying token",
//                 });
//             } else {
//                 req.user_id = decoded.user_id;
//                 next(); 
//             }
//         });
//     }
// }
// VERIFY/AUTHENTICATE USER API
userRouter.get("/verifyuser", verifyUser, authUser);

// GET USER DETAILS API
userRouter.get("/userdetails",verifyUser,getUser);