import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { TasksProgressContainer } from "../components/TasksProgressContainer";
import { InputContainer } from "../components/InputContainer";
import { ItemContainer } from "../components/ItemContainer";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";

export function PrevTicketPage({
  users,
  setUsers,
  ongoingSess,
  input,
  setInput,
  officeSelected,
  setOfficeSelected,
  // displayInputContainer,
  // setDisplayInputContainer,
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
  displayInputContainer,
  setDisplayInputContainer,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const { ticketDateParams } = params;

  // const user = users.find((u) => u.userId === ongoingSess.userId);

  useEffect(() => {
    // setPage("prev-ticket");
    // setDisplayInputContainer(false);
    // setTicketDate(ticketDate);

    loadTickets(ticketDateParams);
    updateFirstName();
    setDisplayInputContainer(false)
  }, []);

  // const ticketDateExists = user.tasks.find(
  //   (task) => dayjs(task.createdAt).format("YYYY-MM-DD") === ticketDateParams,
  // );
  // if (!ticketDateExists) navigate("/");

  return (
    <>
      <title>TicketFocus - Prev. Tickets</title>

      <div className="main-content">
        <header>
          <h1 className="project-name dark-blue">TicketFocus</h1>
        </header>

        <main>
          <section className="task-details-container">
            {/* <TasksProgressContainer
              user={user ? user : ""}
              todaysDate={""}
              ticketDate={ticketDate}
              setTicketDate={setTicketDate}
              page={page}
              ticketDateParams={ticketDateParams}
            /> */}

            <TasksProgressContainer 
              tickets={tickets} 
              firstName={firstName}  
              ticketDateParams={ticketDateParams}
            />
          </section>

          <section className="task-list-container p-inline-1rem white-bg rounded-8px">
            <div className="list-container p-block-1rem">
              {/* {displayInputContainer && (
                <InputContainer
                  input={input}
                  setInput={setInput}
                  officeSelected={officeSelected}
                  setOfficeSelected={setOfficeSelected}
                  user={user ? user : ""}
                  setUsers={setUsers}
                  page={"prev-ticket"}
                  isEditingTicket={isEditingTicket}
                  setIsEditingTicket={setIsEditingTicket}
                  ticketToEdit={ticketToEdit}
                  setTicketToEdit={setTicketToEdit}
                  setDisplayInputContainer={setDisplayInputContainer}
                />
              )} */}

              {displayInputContainer && (
                <InputContainer
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                  loadTickets={loadTickets}
                  isEditingTicket={isEditingTicket}
                  setIsEditingTicket={setIsEditingTicket}
                  setDisplayInputContainer={setDisplayInputContainer}
                />
              )}
            </div>

            {/* <ul className="task-list">
              {!user.tasks.find(
                (task) =>
                  dayjs(task.createdAt).format("YYYY-MM-DD") ===
                  ticketDateParams,
              ) && (
                <li className="no-task-yet item-container p-block-1rem">
                  No tickets for{" "}
                  {dayjs(ticketDateParams).format("DD MMMM, YYYY")}
                </li>
              )}

              {user.tasks &&
                user.tasks.map((task) => {
                  const formattedTaskDate = dayjs(task.createdAt).format(
                    "YYYY-MM-DD",
                  );
                  return (
                    formattedTaskDate === ticketDateParams && (
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
                    setDisplayInputContainer={setDisplayInputContainer}
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
