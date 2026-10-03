import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.userSessionToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      status: "fail",
      message: "You are not authenticated",
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
};
