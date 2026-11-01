import dayjs from "dayjs";
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

export const allTickets = async (req,res) => {

  try {
    verifyAdmin(req,res);

    const ticketsData = await mySqlPool.query(`
      SELECT tickets.id,ticket,office,completed,created_at,first_name
      FROM tickets
      INNER JOIN users
      ON tickets.user_id = users.id;
    `);
    if(!ticketsData) {
      return res.status(500).json({
        success: false,
        message: "Error in DB query"
      });
    }

    const tickets = ticketsData[0].map((ticket) => {
      return {
        id: ticket.id,
        text: ticket.ticket,
        office: ticket.office,
        completed: Boolean(ticket.completed),
        createdAt: dayjs(ticket.created_at).valueOf(),
        creator: ticket.first_name,
      };
    });
    const completeTickets = ticketsData[0].filter(ticket => Boolean(ticket.completed) === true);
    const pendingTickets = ticketsData[0].filter(ticket => Boolean(ticket.completed) !== true);

    res.status(200).json({
      success: true,
      message: "All user tickets",
      tickets: {
        allTickets: tickets,
        totalTickets: tickets.length,
        completeTickets: completeTickets.length,
        pendingTickets: pendingTickets.length,
      }
      
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in get all tickets API",
      error
    });
  }

}