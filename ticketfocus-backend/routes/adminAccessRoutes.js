import express from "express";
import cookieParser from "cookie-parser";
import { getUsers } from "../controllers/adminAccessController.js";
import { verifyUser } from "../utils/verify.js";

export const adminRouter = express.Router();
adminRouter.use(cookieParser());

adminRouter.get("/getusers", verifyUser, getUsers);
