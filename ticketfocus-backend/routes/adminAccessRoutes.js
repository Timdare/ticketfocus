import express from "express";
import cookieParser from "cookie-parser";
import { getUsers, deleteUser, allTickets, deleteTicket, addUser, getUserDetails, updateUserDetails } from "../controllers/adminAccessController.js";
import { verifyUser } from "../utils/verify.js";

export const adminRouter = express.Router();
adminRouter.use(cookieParser());

adminRouter.get("/getusers", verifyUser, getUsers); // GET ALL USERS
adminRouter.delete("/deleteuser/:user_id", verifyUser, deleteUser); // DELETE A USER
adminRouter.get("/all-tickets",verifyUser, allTickets); // GET ALL TICKETS
adminRouter.post("/adduser", verifyUser, addUser); // ADD A USER
adminRouter.put("/updateuser/:user_id", verifyUser, updateUserDetails); // UPDATE USER DETAILS
adminRouter.delete("/deleteticket/:ticket_id", verifyUser, deleteTicket); // DELETE A TICKET
adminRouter.get("/getuserdetails/:user_id",verifyUser,getUserDetails); // GET USER DETAILS