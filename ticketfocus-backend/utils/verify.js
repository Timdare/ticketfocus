import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { mySqlPool } from "../config/db.js";

dotenv.config(); // CONFIGURE dotenv TO USE ENVIRONMENT VARIABLES

const login_token = process.env.JWT_LOGIN_TOKEN;

export const verifyUser = (req, res, next) => {
  const token = req.cookies.userSessionToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      status: "fail",
      message: "You are not authenticated",
    });
  } else {
    jwt.verify(token, login_token, (err, decoded) => {
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
};

export const verifyAdmin = async (req,res) => {
    const {user_id} = req;
    if(!user_id) {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated"
        });
    }

    const roleData = await mySqlPool.query(`SELECT user_role FROM users WHERE id = ?`, [user_id]);
    const {user_role} = roleData[0][0];
    if(user_role !== "admin"){
        return res.status(403).json({
            success: false,
            message: "User forbidden from accessing this data"
        });
    };
}