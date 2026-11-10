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
    
    const users = await Promise.all(
      usersData[0].map(async(user) => {
        
        const data = await mySqlPool.query(`
          SELECT count(user_id) AS userTicketsCount
          FROM tickets
          WHERE user_id = ?
        `,[user.id]);
        const userTicketsCount = data[0][0].userTicketsCount;
        return {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          role: user.user_role,
          userTicketsCount
        }

      })
    )  

    res.status(200).json({
      message: "All users",
      success: true,
      totalUsers: usersData[0].length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all users API",
      error,
    });
  }
}

// DELETE A USER
export const deleteUser =  async (req,res) => {
  const sql = `DELETE FROM users WHERE id = (?)`;
  try {

    verifyAdmin(req,res);
    const user_id = parseInt(req.params.user_id);
    if (!user_id) {
      return res.status(404).json({
        success: false,
        message: "Please provide a valid user ID",
      });
    }

    const data = await mySqlPool.query(sql, [user_id]);
    if (!data) {
      return res.status(500).json({
        success: false,
        message: "Error in DB query",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in delete user API",
    });
  }
}

// GET ALL TICKETS
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

// DELETE A TICKET
export const deleteTicket =  async (req,res) => {
  const sql = `DELETE FROM tickets WHERE id = (?)`;
  try {

    verifyAdmin(req,res);
    const ticket_id = parseInt(req.params.ticket_id);
    if (!ticket_id) {
      return res.status(404).json({
        success: false,
        message: "Please provide a valid ticket ID",
      });
    }

    const data = await mySqlPool.query(sql, [ticket_id]);
    if (!data) {
      return res.status(500).json({
        success: false,
        message: "Error in DB query",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in delete ticket API",
    });
  }
}