import express from "express";
import { getUsers } from "../controllers/userController.js";

export const router = express.Router();    // ROUTER OBJECT

router.get("/getusers", getUsers);
