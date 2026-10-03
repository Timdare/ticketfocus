import axios from "axios";
import dayjs from "dayjs";
import { updateLocalStorage } from "../utils/updateLocalStorage";
import { getCurrentPage } from "../utils/getCurrentPage";
import "./InputContainer.css";

export function InputContainer({
  input,
  setInput,
  officeSelected,
  setOfficeSelected,
  setUsers,
  user,
  page,
  // isEditingTicket,
  // setIsEditingTicket,
  ticketToEdit,
  setTicketToEdit,
  // setDisplayInputContainer,

  inputValues,
  setInputValues,
  loadTickets,
  isEditingTicket,
  setIsEditingTicket,
  setDisplayInputContainer
}) {
  // const user = users.find((u) => u.userId === JSON.parse(localStorage.getItem("ongoingSess"))?.userId);
  function saveInput(e) {
    setInput(e.target.value);
  }
  const selectOffice = (e) => {
    setOfficeSelected(e.target.value.toLowerCase());
  };

  const todaysDate = dayjs().format("YYYY-MM-DD");

  async function addTicket() {
    if (inputValues.text === "") return;
    // const newTasks = [
    //   ...user.tasks,
    //   {
    //     id: crypto.randomUUID(),
    //     text: input,
    //     office: officeSelected,
    //     completed: false,
    //     createdAt: dayjs().valueOf(),
    //   },
    // ];
    // // setTasks(newTasks);
    // setUsers((prevUsers) => {
    //   const ongoingSess = JSON.parse(localStorage.getItem("ongoingSess")) || {};
    //   if (!ongoingSess.userId) return prevUsers; // If no ongoing session, return previous users
    //   const updatedUsers = prevUsers.map((user) => {
    //     if (user.userId === ongoingSess.userId) {
    //       return { ...user, tasks: newTasks };
    //     }
    //     return user;
    //   });
    //   updateLocalStorage("users", updatedUsers);
    //   return updatedUsers;
    // });

    // setInput("");
    // setDisplayInputContainer(true);


    // CREATE TICKET LOGIC
    const res = await axios.post("/api/tickets/createticket",inputValues);
    alert(res.data.message);
    await loadTickets(todaysDate);
    setInputValues({...inputValues,text: ""});
  }

    const editTicket = async () => {
    // if (input === "") return;
    // const newTasks = [
    //   ...user.tasks,
    //   {
    //     id: ticketToEdit.id,
    //     text: input,
    //     office: officeSelected,
    //     completed: ticketToEdit.completed,
    //     createdAt: ticketToEdit.createdAt,
    //   },
    // ];
    // setUsers((prevUsers) => {
    //   const ongoingSess = JSON.parse(localStorage.getItem("ongoingSess")) || {};
    //   if (!ongoingSess.userId) return prevUsers; // If no ongoing session, return previous users
    //   const updatedUsers = prevUsers.map((user) => {
    //     if (user.userId === ongoingSess.userId) {
    //       return { ...user, tasks: newTasks };
    //     }
    //     return user;
    //   });
    //   updateLocalStorage("users", updatedUsers);
    //   return updatedUsers;
    // });

    // setIsEditingTicket(false);
    // setTicketToEdit({});
    // setInput("");
    // page === "dashboard" ? setDisplayInputContainer(true) : setDisplayInputContainer(false);

    if(inputValues.text === "") return;
    const {id,completed} = isEditingTicket.ticket;
    // UPDATE TICKET USING API
    try {
      const res = await axios.put(`/api/tickets/updateticket/${id}`,{
        text: inputValues.text,
        office: inputValues.office,
        completed
      });
      alert(res.data.message);
      const editingTicketDate = dayjs(isEditingTicket.ticket.createdAt).format("YYYY-MM-DD");
      getCurrentPage() === "/" ? await loadTickets(todaysDate) : await loadTickets(editingTicketDate);
      setInputValues({...inputValues, text: ""})
      if (getCurrentPage() === "prev-ticket") setDisplayInputContainer(false)
    } catch (error) {
      console.log(error.response);
    } finally{
      const editingTicketDate = dayjs(isEditingTicket.ticket.createdAt).format("YYYY-MM-DD");
      getCurrentPage() === "/" ? await loadTickets(todaysDate) : await loadTickets(editingTicketDate);
      setIsEditingTicket({
        status: false,
        ticket: {}
      });
      // await loadTickets();
    }

  };

  const handleSpecialKeys = async (e) => {
    e.key === "Enter" && (isEditingTicket.status ? editTicket() : addTicket());
    if (e.key === "Escape") {
      // setInput("");
      // setIsEditingTicket(false);
      // page !== "dashboard" && setDisplayInputContainer(false);
      // setUsers(JSON.parse(localStorage.getItem("users")));

      const editingTicketDate = dayjs(isEditingTicket.ticket.createdAt).format("YYYY-MM-DD");
      getCurrentPage() === "/" ? await loadTickets(todaysDate) : await loadTickets(editingTicketDate);

      setInputValues({...inputValues,text: ""});
      setIsEditingTicket({
        ...isEditingTicket,
        status: false,
      })
      // await loadTickets();
    }
  };



  return (
    <>
      {/* <div className="input-container">
        <div className="input-icon">
          <i className="fa-solid fa-plus"></i>
        </div>
        <input
          type="text"
          placeholder="Add a new ticket..."
          className="light-grey-bg"
          onChange={saveInput}
          onKeyDown={handleSpecialKeys}
          value={input}
        />
        <select
          className="office dark-grey-text"
          onChange={selectOffice}
          value={officeSelected}
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
          {isEditingTicket ? (
            <button className="add-task-button" onClick={editTask}>
              Edit Ticket
            </button>
          ) : (
            <button className="add-task-button" onClick={addTask}>
              {page === "dashboard" ? "Add" : "Edit"} Ticket
            </button>
          )}
        </div>
      </div> */}


      <div className="input-container">
        <div className="input-icon">
          <i className="fa-solid fa-plus"></i>
        </div>

        <input
          type="text"
          placeholder="Add a new ticket..."
          className="light-grey-bg"
          onChange={e => setInputValues({...inputValues,text: e.target.value})}
          value={inputValues.text}
          onKeyDown={handleSpecialKeys}
        />
        <select
          className="office dark-grey-text"
          onChange={e => setInputValues({...inputValues,office: e.target.value})}
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
            <button 
              className="add-task-button"
              onClick={editTicket}
            >Edit ticket</button>
          ) : (
            <button 
              className="add-task-button"
              onClick={addTicket}
            >Add ticket</button>
          )}
          
        </div>

      </div>
    </>
    
  );
}
