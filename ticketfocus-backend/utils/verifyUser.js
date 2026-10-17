import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
