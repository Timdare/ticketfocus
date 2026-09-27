import {mySqlPool} from "../config/db.js";
import jwt from "jsonwebtoken";

// GET ALL USERS
export const getUsers = async (req,res) => {
    try {
        const data = await mySqlPool.query("SELECT * FROM users");
        if (!data) {
            return res.status(404).send({
                message: "No users found",
                success: false,
            });
        }
        res.status(200).json({
            message: "All users",
            success: true,
            totalUsers: data[0].length,
            users: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all students API",
            error,
        });
    }
}


// LOGIN API
export const userLogin = async (req,res) => {
    const sql = `SELECT * FROM users WHERE user_name = (?)`;

    try {
        const user_name = req.body.userName;
        if(!user_name) {
            return res.status(500).json({
                message: "Username is required!"
            });
        } 
        const [data] = await mySqlPool.query(sql,[user_name]);

        if (!data) {
            return res.status(500).json({
                message: "Error in db query",
                status: "fail",
                success: false
            });
        }
        const user_password = data[0].user_password;
        if (user_password === req.body.password) {
            const user_id = data[0].id;
            const token = jwt.sign({user_id}, "jwt-secret-login-token",{expiresIn: "2d"});
            res.cookie("userSessionToken",token);

            return res.status(200).json({
                success: true,
                message: "Login successful"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in login API",
            error
        });
    }
}



// VERIFY/AUTHENTICATE USER FUNCTION
export const authUser = async (req,res) => {
   return res.status(200).json({
    success: true,
    message: "User is authorized",
    user_id: req.user_id,
    status: "success"
   }); 
}