import dayjs from "dayjs";
import { mySqlPool } from "../config/db.js";

// GET USER TICKETS
export const getUserTickets = async (req,res) => {
    const sql = `SELECT * FROM tickets WHERE user_id = (?)`;
    try {
        const user_id = req.user_id;
        console.log(user_id);
        const data = await mySqlPool.query(sql, [user_id]);
        if(!data) {
            return res.status(500).json({
                success: false,
                message: "No tickets found"
            });
        }
        const tickets = data[0].map(ticket_data => {
            return {
                id: ticket_data.id,
                text: ticket_data.ticket,
                office: ticket_data.office,
                completed: Boolean(ticket_data.completed),
                createdAt: dayjs(ticket_data.created_at).valueOf()
            }
        });
        res.status(200).json({
            success: true,
            message: "All user tickets",
            totalTickets: tickets.length,
            tickets
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in get user tickets API"
        });
    }
    
}

// CREATE NEW TICKET
export const createTicket = async (req,res) => {
    const sql = `INSERT INTO tickets (user_id,ticket,office) VALUES (?,?,?)`;
    try {
        const {text,office} = req.body;
        if(!text) {
            return res.status(400).json({
                success: false,
                message: "text field is required"
            });
        }
        if(!office) {
            return res.status(400).json({
                success: false,
                message: "office must be selected"
            });
        }
        const user_id = req.user_id;
        const data = await mySqlPool.query(sql,[user_id,text,office]);
        if(!data){
            return res.status(500).json({
                success: false,
                message: "error in DB query"
            });
        }
        return res.status(201).json({
            success: true,
            message: "Ticket created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in create ticket API"
        });
    }
}