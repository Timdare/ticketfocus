import { mySqlPool } from "../config/db.js";
import { verifyAdmin } from "../utils/verify.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {

    verifyAdmin(req,res);
    
    const usersData = await mySqlPool.query("SELECT * FROM users");
    if (!usersData) {
      return res.status(404).send({
        message: "No users found",
        success: false,
      });
    }
    res.status(200).json({
      message: "All users",
      success: true,
      totalUsers: usersData[0].length,
      users: usersData[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all users API",
      error,
    });
  }
};