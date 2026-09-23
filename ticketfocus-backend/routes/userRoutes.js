import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { getUsers, userLogin, authUser } from "../controllers/userController.js";

export const router = express.Router();    // ROUTER OBJECT

router.use(cookieParser()); // MIDDLEWARE TO READ/EXTRACT COOKIES FROM CLIENT

router.get("/auth/getusers", getUsers);
router.post("/auth/login", userLogin); // LOGIN API
// VERIFY/AUTHENTICATE USER API
const verifyUser = (req,res, next) => {
    const token = req.cookies.userSessionToken;
    if(!token) {
        return res.status(401).json({
            success: false,
            status: "fail",
            message: "You are not authenticated"
        });
    } else {
        jwt.verify(token, "jwt-secret-login-token", (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    status: "fail",
                    message: "Error verifying token",
                });
            } else {
                req.user_id = decoded.user_id;
                next(); 
            }
        });
    }
}
router.get("/auth/verifyuser", verifyUser, authUser);