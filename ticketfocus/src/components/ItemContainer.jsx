import axios from "axios";
import dayjs from "dayjs";
import "./ItemContainer.css";
export function ItemContainer({
  ticket,
  setTickets,
  loadTickets,
  setIsEditingTicket,
  setDisplayInputContainer,
  updateInputs,
}) {
  async function updateTaskStatus(e) {
    // UPDATE TICKET STATUS USING API
    try {
      await axios.put(`/api/tickets/updateticket/${ticket.id}`, {
        completed: e.target.checked,
      });
      const ticketDate = dayjs(ticket.createdAt).format("YYYY-MM-DD");
      await loadTickets(ticketDate);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function deleteTicket() {
    // DELETE TICKET USING API
    try {
      const ticketCopy = { ...ticket };
      const res = await axios.delete(`/api/tickets/deleteticket/${ticket.id}`);
      alert(res.data.message);
      await loadTickets(dayjs(ticketCopy.createdAt).format("YYYY-MM-DD"));
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const editTicket = () => {
    setDisplayInputContainer(true);
    const ticketCopy = { ...ticket };
    setIsEditingTicket({
      status: true,
      ticket: { ...ticketCopy },
    });
    updateInputs(ticketCopy);
    setTickets((prevTickets) => {
      return prevTickets.filter((t) => t.id !== ticket.id);
    });
  };

  return (
    <>
      <li className="item-container d-flex p-block-1rem">
        <div className="item-text-container dark-grey-text">
          <input
            type="checkbox"
            id={ticket.id}
            className="check"
            checked={ticket.completed}
            onChange={updateTaskStatus}
            title="Mark as complete"
          />
          <label className="item-text dark-grey-text" htmlFor={ticket.id}>
            {ticket.text}
          </label>
        </div>

        <div className="utils">
          <span className="edit-icon-container" onClick={editTicket}>
            <i className="fa-regular fa-pen-to-square edit-icon"></i>
          </span>
          <span
            className="office dark-grey-text light-grey-bg"
            title={`Office: ${ticket.office}`}
          >
            Office: {ticket.office}
          </span>
          <span className="delete-icon-container" onClick={deleteTicket}>
            <i className="fa-solid fa-trash-can delete-icon "></i>
          </span>
        </div>
      </li>
    </>
  );
}
