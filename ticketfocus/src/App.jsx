import { useState } from "react";
import { ItemContainer } from "./components/ItemContainer";
import { TasksProgressContainer } from "./components/TasksProgressContainer";
import { InputContainer } from "./components/InputContainer";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  const [input, setInput] = useState("");
  const [categorySelected, setCategorySelected] = useState("personal");

  function updateInputs(name, category) {
    setInput(name);
    setCategorySelected(category);
  }

  return (
    <>
      <div className="main-content">
        <header>
          <h1 className="project-name dark-blue">TaskFocus</h1>
        </header>

        <main>
          <section className="task-details-container">
            <TasksProgressContainer tasks={tasks} />

            <section className="work-session-container light-blue-bg rounded-8px p-inline-1rem">
              <div>
                <i className="fa-solid fa-stopwatch fa-2x white-text"></i>
              </div>
              <p className="white-text deep-work-session-text">
                Deep Work Session
              </p>
              <p className="white-text deep-work-session-time">25:00</p>
            </section>
          </section>

          <section className="task-list-container p-inline-1rem white-bg rounded-8px">
            <div className="list-container p-block-1rem">
              {/* <div className="input-container">
                <div className="input-icon">
                  <i className="fa-solid fa-plus"></i>
                </div>
                <input
                  type="text"
                  placeholder="Add a new task..."
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
                    Add Task
                  </button>
                </div>
              </div> */}

              <InputContainer
                input={input}
                setInput={setInput}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                tasks={tasks}
                setTasks={setTasks}
              />
            </div>
            <ul className="task-list">
              {tasks.length === 0 && (
                <li className="no-task-yet item-container p-block-1rem">No tasks yet.</li>
              )}
              {tasks.map((task) => {
                return (
                  <ItemContainer
                    task={task}
                    key={task.id}
                    setTasks={setTasks}
                    updateInputs={updateInputs}
                  />
                );
              })}

              {/* <li className="item-container d-flex">
                <label className="item-text-container dark-grey-text" htmlFor="task1">
                  <input type="checkbox" name="" id="task1" className="check" />
                  <span className="item-text dark-grey-text">Finalize project proposal</span>
                </label>
                
                <div className="utils">
                  <span className="category dark-grey-text light-grey-bg">Work</span>
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
                  <span className="category dark-grey-text light-grey-bg">Personal</span>
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
                  <span className="category dark-grey-text light-grey-bg">Health</span>
                  <span className="delete-icon-container">
                    <i className="fa-solid fa-trash-can delete-icon "></i>
                  </span>
                </div>
              </li> */}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
