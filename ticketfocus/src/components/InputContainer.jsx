import axios from "axios";
import dayjs from "dayjs";
import { updateLocalStorage } from "../utils/updateLocalStorage";
import "./InputContainer.css";

export function InputContainer({
  input,
  setInput,
  officeSelected,
  setOfficeSelected,
  setUsers,
  user,
  page,
  isEditingTicket,
  setIsEditingTicket,
  ticketToEdit,
  setTicketToEdit,
  setDisplayInputContainer,

  inputValues,
  setInputValues,
  loadTickets
}) {
  // const user = users.find((u) => u.userId === JSON.parse(localStorage.getItem("ongoingSess"))?.userId);
  function saveInput(e) {
    setInput(e.target.value);
  }
  const selectOffice = (e) => {
    setOfficeSelected(e.target.value.toLowerCase());
  };

  async function addTicket() {
    if (input === "") return;
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
    await loadTickets();
    setInputValues({...inputValues,text: ""});
  }

  const handleSpecialKeys = (e) => {
    e.key === "Enter" && addTicket();
    // e.key === "Enter" && (isEditingTicket ? editTask() : addTask());
    if (e.key === "Escape") {
      setInput("");
      setIsEditingTicket(false);
      page !== "dashboard" && setDisplayInputContainer(false);
      setUsers(JSON.parse(localStorage.getItem("users")));
    }
  };

  const editTask = () => {
    if (input === "") return;
    const newTasks = [
      ...user.tasks,
      {
        id: ticketToEdit.id,
        text: input,
        office: officeSelected,
        completed: ticketToEdit.completed,
        createdAt: ticketToEdit.createdAt,
      },
    ];
    setUsers((prevUsers) => {
      const ongoingSess = JSON.parse(localStorage.getItem("ongoingSess")) || {};
      if (!ongoingSess.userId) return prevUsers; // If no ongoing session, return previous users
      const updatedUsers = prevUsers.map((user) => {
        if (user.userId === ongoingSess.userId) {
          return { ...user, tasks: newTasks };
        }
        return user;
      });
      updateLocalStorage("users", updatedUsers);
      return updatedUsers;
    });

    setIsEditingTicket(false);
    setTicketToEdit({});
    setInput("");
    page === "dashboard" ? setDisplayInputContainer(true) : setDisplayInputContainer(false);
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
          <button 
            className="add-task-button"
            onClick={addTicket}
          >Add ticket</button>
        </div>

      </div>
    </>
    
  );
}
