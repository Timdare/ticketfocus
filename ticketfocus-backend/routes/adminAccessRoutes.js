import express from "express";
import cookieParser from "cookie-parser";
import { getUsers, deleteUser, allTickets } from "../controllers/adminAccessController.js";
import { verifyUser } from "../utils/verify.js";

export const adminRouter = express.Router();
adminRouter.use(cookieParser());

adminRouter.get("/getusers", verifyUser, getUsers); // GET ALL USERS
adminRouter.delete("/deleteuser/:user_id", verifyUser, deleteUser); // DELETE A USER
adminRouter.get("/all-tickets",verifyUser, allTickets); // GET ALL TICKETS
