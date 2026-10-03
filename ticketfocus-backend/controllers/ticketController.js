import dayjs from "dayjs";
import { mySqlPool } from "../config/db.js";

// GET USER TICKETS
export const getUserTickets = async (req, res) => {
  const sql = `SELECT * FROM tickets WHERE user_id = (?)`;
  try {
    const user_id = req.user_id;
    console.log(user_id);
    const data = await mySqlPool.query(sql, [user_id]);
    if (!data) {
      return res.status(500).json({
        success: false,
        message: "No tickets found",
      });
    }
    const tickets = data[0].map((ticket_data) => {
      return {
        id: ticket_data.id,
        text: ticket_data.ticket,
        office: ticket_data.office,
        completed: Boolean(ticket_data.completed),
        createdAt: dayjs(ticket_data.created_at).valueOf(),
      };
    });
    res.status(200).json({
      success: true,
      message: "All user tickets",
      totalTickets: tickets.length,
      tickets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in get user tickets API",
    });
  }
};

// CREATE NEW TICKET
export const createTicket = async (req, res) => {
  const sql = `INSERT INTO tickets (user_id,ticket,office) VALUES (?,?,?)`;
  try {
    const { text, office } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "text field is required",
      });
    }
    if (!office) {
      return res.status(400).json({
        success: false,
        message: "office must be selected",
      });
    }
    const user_id = req.user_id;
    const data = await mySqlPool.query(sql, [user_id, text, office]);
    if (!data) {
      return res.status(500).json({
        success: false,
        message: "error in DB query",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in create ticket API",
    });
  }
};

// DELETE A TICKET
export const deleteTicket = async (req, res) => {
  const sql = `DELETE FROM tickets WHERE id = (?)`;
  try {
    const user_id = req.user_id;
    const ticket_id = parseInt(req.params.ticket_id);

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
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
};

// UPDATE A TICKET
export const updateTicket = async (req, res) => {
  try {
    const user_id = req.user_id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
    const ticket_id = parseInt(req.params.ticket_id);
    if (!ticket_id) {
      return res.status(400).json({
        success: false,
        message: "Please give a valid ticket",
      });
    }
    const { text, office, completed } = req.body;
    let data;
    if (text) {
      data = await mySqlPool.query(
        `UPDATE TICKETS SET ticket = ? WHERE id = ?`,
        [text, ticket_id],
      );
    }
    if (office) {
      data = await mySqlPool.query(
        `UPDATE TICKETS SET office = ? WHERE id = ?`,
        [office, ticket_id],
      );
    }
    if ("completed" in req.body) {
      data = await mySqlPool.query(
        `UPDATE TICKETS SET completed = ? WHERE id = ?`,
        [completed, ticket_id],
      );
    }

    if (!data) {
      return res.status(500).json({
        success: false,
        message: "Error in DB query",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in update ticket API",
    });
  }
};

// GET TICKET DATES
export const getTicketDate = async (req, res) => {
  try {
    const user_id = req.user_id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "You are not authenticated",
      });
    }
    const data = await mySqlPool.query(
      `SELECT created_at FROM tickets WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id],
    );
    if (!data) {
      return res.status(500).json({
        success: false,
        message: "Error in DB query",
      });
    }
    const dates = data[0].map((ticket) => ticket.created_at);
    res.status(200).json({
      success: true,
      message: "All tickets' creation date",
      dates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in get tickets' date API",
    });
  }
};

// GET TICKETS BY DATES
export const getTicketsByDate = async (req,res) => {
  const sql = `SELECT * FROM tickets WHERE user_id = ?`;

  try {
    const user_id = req.user_id;
    if(!user_id) {
      return res.status(401).json({
        success: false,
        message: "You are not authenticated"
      })
    }
    const date = req.params.ticketsDate;
    if(!date) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid date"
      });
    }

    const data = await mySqlPool.query(sql,[user_id]);
    if(!data) {
      return res.status(500).json({
        success: false,
        message: "Error in db query"
      });
    }

    const ticketsData = data[0].map(ticket => {
      return {
        id: ticket.id,
        text: ticket.ticket,
        office: ticket.office,
        completed: Boolean(ticket.completed),
        createdAt: dayjs(ticket.created_at).valueOf(),
      }
    });

    const ticketsDateMatch = ticketsData.filter(ticket => {
      return dayjs(ticket.createdAt).format("YYYY-MM-DD") === date
    });
    return res.status(200).json({
      success: true,
      message: `All tickets for ${date}`,
      tickets: ticketsDateMatch
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get tickets by date API",
      error
    });
  }
}
