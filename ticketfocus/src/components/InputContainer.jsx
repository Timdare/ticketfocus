import { updateLocalStorage } from "../utils/updateLocalStorage";
import "./InputContainer.css";

export function InputContainer({
  input,
  setInput,
  categorySelected,
  setCategorySelected,
  tasks,
  setTasks,
}) {
  function saveInput(e) {
    setInput(e.target.value);
  }
  const selectCategory = (e) => {
    setCategorySelected(e.target.value.toLowerCase());
  };

  function addTask() {
    if (input === "") return;
    const newTasks = [
      ...tasks,
      {
        id: crypto.randomUUID(),
        text: input,
        category: categorySelected,
        completed: false,
      },
    ];
    setTasks(newTasks);
    setInput("");
    updateLocalStorage("tasks", newTasks);
  }

  const addTaskEnterKey = (e) => {
    e.key === "Enter" && addTask();
  };

  return (
    <div className="input-container">
      <div className="input-icon">
        <i className="fa-solid fa-plus"></i>
      </div>
      <input
        type="text"
        placeholder="Add a new ticket..."
        className="light-grey-bg"
        onChange={saveInput}
        onKeyDown={addTaskEnterKey}
        value={input}
      />
      <select
        className="category dark-grey-text"
        onChange={selectCategory}
        value={categorySelected}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="health">Health</option>
      </select>
      <div className="add-task-button-container">
        <button className="add-task-button" onClick={addTask}>
          Add Ticket
        </button>
      </div>
    </div>
  );
}
