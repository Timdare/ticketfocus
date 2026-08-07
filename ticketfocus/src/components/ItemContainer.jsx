import { updateLocalStorage } from "../utils/updateLocalStorage";
export function ItemContainer({ task, setTasks, updateInputs }) {
  function updateTaskStatus(e) {
    setTasks((prevTasks) => {
      const updated = prevTasks.map((prevTask) =>
        prevTask.id === task.id
          ? { ...prevTask, completed: e.target.checked }
          : prevTask,
      );
      updateLocalStorage("tasks", updated);
      return updated;
    });
  }

  function deleteTask() {
    setTasks((prevTasks) => {
      const updated = prevTasks.filter(
        (currentTask) => currentTask.id !== task.id,
      );
      updateLocalStorage("tasks", updated);
      return updated;
    });
  }

  const editTask = () => {
    updateInputs(task.text, task.category);
    setTasks((prevTasks) =>
      prevTasks.filter((currentTask) => currentTask.id !== task.id),
    );
  };

  return (
    <li className="item-container d-flex">
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
        <span className="category dark-grey-text light-grey-bg">
          {task.category}
        </span>
        <span className="delete-icon-container" onClick={deleteTask}>
          <i className="fa-solid fa-trash-can delete-icon "></i>
        </span>
      </div>
    </li>
  );
}
