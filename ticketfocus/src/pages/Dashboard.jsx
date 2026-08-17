import { useState } from "react";
import dayjs from "dayjs";
import { TasksProgressContainer } from "../components/TasksProgressContainer";
import { InputContainer } from "../components/InputContainer";
import { ItemContainer } from "../components/ItemContainer";
import { WorkSessionContainer } from "../components/WorkSessionContainer";

export function Dashboard({ users, setUsers, ongoingSess }) {
  // const navigate = useNavigate();
  // const ongoingSess = JSON.parse(localStorage.getItem("ongoingSess")) || {};

  // const checkOngoingSess = () => {
  //   if (!ongoingSess || !ongoingSess.userId) {
  //     navigate("/login");
  //   }
  // }
  // useEffect(() => {
  //   if (!ongoingSess || !ongoingSess.userId) {
  //     navigate("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // } , []);

  const user = users.find((u) => u.userId === ongoingSess.userId);
  console.log(user);

  const [input, setInput] = useState("");
  const [officeSelected, setOfficeSelected] = useState("701");

  function updateInputs(name, office) {
    setInput(name);
    setOfficeSelected(office);
  }

  const logoutUser = () => {
    localStorage.removeItem("ongoingSess");
    window.location.replace("/login");
  };

  const todaysDate = dayjs().format("YYYY-MM-DD");

  return (
    <>
      <title>TicketFocus - Dashboard</title>
      <div className="main-content">
        <header>
          <h1 className="project-name dark-blue">TicketFocus</h1>
        </header>

        <main>
          <section className="task-details-container">
            <TasksProgressContainer
              // tasks={tasks}
              user={user ? user : ""}
              todaysDate={todaysDate}
            />

            <WorkSessionContainer />
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
                      className="office dark-grey-text"
                      onChange={selectOffice}
                      value={officeSelected}
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
                officeSelected={officeSelected}
                setOfficeSelected={setOfficeSelected}
                // tasks={tasks}
                // setTasks={setTasks}
                // users={users}
                user={user ? user : ""}
                setUsers={setUsers}
              />
            </div>
            <ul className="task-list">
              {user.tasks && user.tasks.length === 0 && (
                <li className="no-task-yet item-container p-block-1rem">
                  No tickets yet.
                </li>
              )}
              {user.tasks &&
                user.tasks.map((task) => {
                  return (
                    <ItemContainer
                      task={task}
                      key={task.id}
                      // setTasks={setTasks}
                      updateInputs={updateInputs}
                      user={user}
                      setUsers={setUsers}
                    />
                  );
                })}

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
            </ul>
          </section>

          <div className="logout-btn-container">
            <button className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
