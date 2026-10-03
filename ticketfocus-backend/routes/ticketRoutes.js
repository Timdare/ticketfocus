import express from "express";
import cookieParser from "cookie-parser";
import {
  createTicket,
  deleteTicket,
  getTicketDate,
  getTicketsByDate,
  getUserTickets,
  updateTicket,
} from "../controllers/ticketController.js";
import { verifyUser } from "../utils/verifyUser.js";

export const ticketRouter = express.Router();

ticketRouter.use(cookieParser()); // MIDDLEWARE TO READ/EXTRACT COOKIES FROM CLIENT

ticketRouter.get("/getUserTickets", verifyUser, getUserTickets); // GET USER TICKETS API

ticketRouter.post("/createTicket", verifyUser, createTicket); // CREATE TICKET API

ticketRouter.delete("/deleteticket/:ticket_id", verifyUser, deleteTicket); // DELETE TICKET API

ticketRouter.put("/updateticket/:ticket_id", verifyUser, updateTicket); // UPDATE TICKET API

ticketRouter.get("/ticketDate", verifyUser, getTicketDate); // GET DATE FOR TICKETS API

ticketRouter.get("/ticketDate/:ticketsDate", verifyUser, getTicketsByDate); // GET TICKETS BY DATE API
