import axios from "axios";
import dayjs from "dayjs";
import { getCurrentPage } from "../utils/getCurrentPage";
import "./InputContainer.css";

export function InputContainer({
  inputValues,
  setInputValues,
  loadTickets,
  isEditingTicket,
  setIsEditingTicket,
  setDisplayInputContainer,
}) {
  const todaysDate = dayjs().format("YYYY-MM-DD");

  async function addTicket() {
    if (inputValues.text === "") return;

    // CREATE TICKET LOGIC
    const res = await axios.post("/api/tickets/createticket", inputValues);
    alert(res.data.message);
    await loadTickets(todaysDate);
    setInputValues({ ...inputValues, text: "" });
  }

  const editTicket = async () => {
    if (inputValues.text === "") return;
    const { id, completed } = isEditingTicket.ticket;
    // UPDATE TICKET USING API
    try {
      const res = await axios.put(`/api/tickets/updateticket/${id}`, {
        text: inputValues.text,
        office: inputValues.office,
        completed,
      });
      alert(res.data.message);
      const editingTicketDate = dayjs(isEditingTicket.ticket.createdAt).format(
        "YYYY-MM-DD",
      );
      getCurrentPage() === "/"
        ? await loadTickets(todaysDate)
        : await loadTickets(editingTicketDate);
      setInputValues({ ...inputValues, text: "" });
      if (getCurrentPage() === "prev-ticket") setDisplayInputContainer(false);
    } catch (error) {
      console.log(error.response);
    } finally {
      const editingTicketDate = dayjs(isEditingTicket.ticket.createdAt).format(
        "YYYY-MM-DD",
      );
      getCurrentPage() === "/"
        ? await loadTickets(todaysDate)
        : await loadTickets(editingTicketDate);
      setIsEditingTicket({
        status: false,
        ticket: {},
      });
    }
  };

  const handleSpecialKeys = async (e) => {
    e.key === "Enter" && (isEditingTicket.status ? editTicket() : addTicket());
    if (e.key === "Escape") {
      const editingTicketDate = dayjs(isEditingTicket.ticket.createdAt).format(
        "YYYY-MM-DD",
      );
      getCurrentPage() === "/"
        ? await loadTickets(todaysDate)
        : await loadTickets(editingTicketDate);

      setInputValues({ ...inputValues, text: "" });
      setIsEditingTicket({
        ...isEditingTicket,
        status: false,
      });
    }
  };

  return (
    <>
      <div className="input-container">
        <div className="input-icon">
          <i className="fa-solid fa-plus"></i>
        </div>

        <input
          type="text"
          placeholder="Add a new ticket..."
          className="light-grey-bg"
          onChange={(e) =>
            setInputValues({ ...inputValues, text: e.target.value })
          }
          value={inputValues.text}
          onKeyDown={handleSpecialKeys}
        />
        <select
          className="office dark-grey-text"
          onChange={(e) =>
            setInputValues({ ...inputValues, office: e.target.value })
          }
          value={inputValues.office}
        >
          <option value="701">701</option>
          <option value="702">702</option>
          <option value="703">703</option>
          <option value="704">704</option>
          <option value="705">705</option>
          <option value="706">706</option>
          <option value="707">707</option>
          <option value="708">708</option>
          <option value="709">709</option>
          <option value="710">710</option>
        </select>

        <div className="add-task-button-container">
          {isEditingTicket.status ? (
            <button className="add-task-button" onClick={editTicket}>
              Edit ticket
            </button>
          ) : (
            <button className="add-task-button" onClick={addTicket}>
              Add ticket
            </button>
          )}
        </div>
      </div>
    </>
  );
}
