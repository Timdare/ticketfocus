import { updateLocalStorage } from "../utils/updateLocalStorage";
import "./ItemContainer.css";
export function ItemContainer({
  task,
  updateInputs,
  user,
  setUsers,
  setDisplayInputContainer,
  setIsEditingTicket,
  setTicketToEdit,

  ticket
}) {

  function updateTaskStatus(e) {
    setUsers((prevUsers) => {
      // const ongoingSess = JSON.parse(localStorage.getItem("ongoingSess")) || {};
      // if (!ongoingSess.userId) return prevUsers;
      if (!user.tasks) return prevUsers;
      const updatedUsers = prevUsers.map((u) => {
        if (u.userId === user.userId) {
          const updatedTasks = u.tasks.map((prevTask) =>
            prevTask.id === task.id
              ? { ...prevTask, completed: e.target.checked }
              : prevTask,
          );
          return { ...u, tasks: updatedTasks };
        }
        return u;
      });
      updateLocalStorage("users", updatedUsers);
      return updatedUsers;
    });
  }

  function deleteTask() {
    setUsers((prevUsers) => {
      if (!user.tasks) return prevUsers;
      const updatedUsers = prevUsers.map((u) => {
        if (u.userId === user.userId) {
          const updatedTasks = u.tasks.filter(
            (currentTask) => currentTask.id !== task.id,
          );
          return { ...u, tasks: updatedTasks };
        }
        return u;
      });
      updateLocalStorage("users", updatedUsers);
      return updatedUsers;
    });
  }

  const editTask = () => {
    setDisplayInputContainer(true);
    setIsEditingTicket(true);
    const ticketCopy = { ...task };
    setTicketToEdit(ticketCopy);
    updateInputs(ticketCopy.text, ticketCopy.office);
    setUsers((prevUsers) => {
      if (!user.tasks) return prevUsers;
      const updatedUsers = prevUsers.map((u) => {
        if (u.userId === user.userId) {
          const updatedTasks = u.tasks.filter(
            (currentTask) => currentTask.id !== task.id,
          );
          return { ...u, tasks: updatedTasks };
        }
        return u;
      });
      return updatedUsers;
    });
  };

  return (
    <>
      
    {/* <li className="item-container d-flex">
          <label className="item-text-container dark-grey-text" htmlFor="task1">
            <input type="checkbox" name="" id="task1" className="check" />
            <span className="item-text dark-grey-text">Finalize project proposal</span>
          </label>
          
          <div className="utils">
            <span className="office dark-grey-text light-grey-bg">Work</span>
            <span className="delete-icon-container">
              <i className="fa-solid fa-trash-can delete-icon "></i>
            </span>
          </div>
        </li>

        <li className="item-container d-flex">
          <label className="item-text-container dark-grey-text" htmlFor="task2">
            <input type="checkbox" name="" id="task2" className="check" />
            <span className="item-text dark-grey-text">Buy groceries</span>
          </label>
          
          <div className="utils">
            <span className="office dark-grey-text light-grey-bg">Personal</span>
            <span className="delete-icon-container">
              <i className="fa-solid fa-trash-can delete-icon "></i>
            </span>
          </div>
        </li>

        <li className="item-container d-flex">
          <label className="item-text-container dark-grey-text" htmlFor="task3">
            <input type="checkbox" name="" id="task3" className="check" />
            <span className="item-text dark-grey-text">Schedule dentist appointment</span>
          </label>
          
          <div className="utils">
            <span className="office dark-grey-text light-grey-bg">Health</span>
            <span className="delete-icon-container">
              <i className="fa-solid fa-trash-can delete-icon "></i>
            </span>
          </div>
        </li> */}
      {/* <li className="item-container d-flex p-block-1rem">
        <div className="item-text-container dark-grey-text">
          <input
            type="checkbox"
            id={task.id}
            className="check"
            checked={task.completed}
            onChange={updateTaskStatus}
            title="Mark as complete"
          />
          <label className="item-text dark-grey-text" htmlFor={task.id}>
            {task.text}
          </label>
        </div>

        <div className="utils">
          <span className="edit-icon-container" onClick={editTask}>
            <i className="fa-regular fa-pen-to-square edit-icon"></i>
          </span>
          <span
            className="office dark-grey-text light-grey-bg"
            title={`Office: ${task.office}`}
          >
            Office: {task.office}
          </span>
          <span className="delete-icon-container" onClick={deleteTask}>
            <i className="fa-solid fa-trash-can delete-icon "></i>
          </span>
        </div>
      </li> */}
      
      <li className="item-container d-flex p-block-1rem">
        <div className="item-text-container dark-grey-text">
          <input
            type="checkbox"
            id={ticket.id}
            className="check"
            checked={ticket.completed}
            onChange={()=>{}}
            title="Mark as complete"
          />
          <label className="item-text dark-grey-text" htmlFor={ticket.id}>
            {ticket.text}
          </label>
        </div>

        <div className="utils">
          <span 
            className="edit-icon-container" 
            // onClick={editTask}
          >
            <i className="fa-regular fa-pen-to-square edit-icon"></i>
          </span>
          <span
            className="office dark-grey-text light-grey-bg"
            title={`Office: ${ticket.office}`}
          >
            Office: {ticket.office}
          </span>
          <span 
            className="delete-icon-container" 
            // onClick={deleteTask}
          >
            <i className="fa-solid fa-trash-can delete-icon "></i>
          </span>
        </div>
      </li>
    </>
    
  );
}
