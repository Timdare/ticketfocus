import { useEffect } from "react";
import dayjs from "dayjs";
import { TasksProgressContainer } from "../components/TasksProgressContainer";
import { InputContainer } from "../components/InputContainer";
import { ItemContainer } from "../components/ItemContainer";
import { WorkSessionContainer } from "../components/WorkSessionContainer";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";

export function Dashboard({
  users,
  setUsers,
  ongoingSess,
  input,
  setInput,
  officeSelected,
  setOfficeSelected,
  displayInputContainer,
  setDisplayInputContainer,
  page,
  setPage,
  // updateInputs,
  // isEditingTicket,
  // setIsEditingTicket,
  ticketToEdit,
  setTicketToEdit,
  ticketDate,
  setTicketDate,

  tickets,
  setTickets,
  loadTickets,
  firstName,
  updateFirstName,
  inputValues,
  setInputValues,
  updateInputs,
  isEditingTicket,
  setIsEditingTicket,
}) {
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
  useEffect(() => {
    // setPage("dashboard");
    // setDisplayInputContainer(() => page === "dashboard");
    // setTicketDate("today");

    loadTickets();
    updateFirstName();

  }, []);

  // const user = users.find((u) => u.userId === ongoingSess.userId);

  // const [input, setInput] = useState("");
  // const [officeSelected, setOfficeSelected] = useState("701");

  // const todaysDate = dayjs().format("YYYY-MM-DD");

  return (
    <>
      <title>TicketFocus - Dashboard</title>
      <div className="main-content">
        <header>
          <h1 className="project-name dark-blue">TicketFocus</h1>
        </header>

        <main>
          <section className="task-details-container">
            {/* <TasksProgressContainer
              // tasks={tasks}
              user={user ? user : ""}
              date={todaysDate}
              ticketDate={ticketDate}
              setTicketDate={setTicketDate}
              page={page}
            /> */}

            <TasksProgressContainer 
              tickets={tickets} 
              firstName={firstName}  
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

              {/* {displayInputContainer && (
                <InputContainer
                  input={input}
                  setInput={setInput}
                  officeSelected={officeSelected}
                  setOfficeSelected={setOfficeSelected}
                  user={user ? user : ""}
                  setUsers={setUsers}
                  page={"dashboard"}
                  isEditingTicket={isEditingTicket}
                  setIsEditingTicket={setIsEditingTicket}
                  ticketToEdit={ticketToEdit}
                  setTicketToEdit={setTicketToEdit}
                  setDisplayInputContainer={setDisplayInputContainer}
                />
              )} */}

              <InputContainer
                inputValues={inputValues}
                setInputValues={setInputValues}
                loadTickets={loadTickets}
                isEditingTicket={isEditingTicket}
                setIsEditingTicket={setIsEditingTicket}
              />
            </div>
            {/* <ul className="task-list">
              {user.tasks && user.tasks.length === 0 && (
                <li className="no-task-yet item-container p-block-1rem">
                  No tickets yet.
                </li>
              )}
              {!user.tasks.find(
                (task) =>
                  dayjs(task.createdAt).format("YYYY-MM-DD") === todaysDate,
              ) && (
                <li className="no-task-yet item-container p-block-1rem">
                  No tickets yet.
                </li>
              )}
              {user.tasks &&
                user.tasks.map((task) => {
                  const formattedTaskDate = dayjs(task.createdAt).format(
                    "YYYY-MM-DD",
                  );
                  return (
                    formattedTaskDate === todaysDate && (
                      <ItemContainer
                        task={task}
                        key={task.id}
                        // setTasks={setTasks}
                        updateInputs={updateInputs}
                        user={user}
                        setUsers={setUsers}
                        setDisplayInputContainer={setDisplayInputContainer}
                        setIsEditingTicket={setIsEditingTicket}
                        setTicketToEdit={setTicketToEdit}
                      />
                    )
                  );
                })}

            </ul> */}

            <ul className="task-list">

              {tickets && tickets.length === 0 && (
                <li className="no-task-yet item-container p-block-1rem">
                  No tickets yet.
                </li>
              )}

              {tickets.map(ticket => {
                return (
                  <ItemContainer
                    key={ticket.id}
                    ticket={ticket}
                    loadTickets={loadTickets}
                    setIsEditingTicket={setIsEditingTicket}
                    updateInputs={updateInputs}
                    setTickets={setTickets}
                  />
                )
              })}

            </ul>
          </section>

          <LogoutBtnContainer />
        </main>
      </div>
    </>
  );
}
