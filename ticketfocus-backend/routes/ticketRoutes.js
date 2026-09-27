import express from "express";
import cookieParser from "cookie-parser";
import { getUserTickets } from "../controllers/ticketController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const ticketRouter = express.Router();

ticketRouter.use(cookieParser()); // MIDDLEWARE TO READ/EXTRACT COOKIES FROM CLIENT

ticketRouter.get("/getUserTickets",verifyUser,getUserTickets);