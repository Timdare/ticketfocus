import { updateLocalStorage } from "../utils/updateLocalStorage";
import "./ItemContainer.css";
export function ItemContainer({ task, updateInputs, user, setUsers }) {
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
      console.log(updatedUsers);
      return updatedUsers;
    });
  }

  const editTask = () => {
    updateInputs(task.text, task.office);
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
    <li className="item-container d-flex p-block-1rem">
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
    </li>
  );
}
