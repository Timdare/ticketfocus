import {mySqlPool} from "../config/db.js";


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