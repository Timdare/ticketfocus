import { useEffect } from "react";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import { TasksProgressContainer } from "../components/TasksProgressContainer";
import { InputContainer } from "../components/InputContainer";
import { ItemContainer } from "../components/ItemContainer";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";

export function Dashboard({
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
  const todaysDate = dayjs().format("YYYY-MM-DD");
  useEffect(() => {
    loadTickets(todaysDate);
    updateFirstName();
    setDisplayInputContainer(true);
  }, []);

  return (
    <>
      <title>TicketFocus - Dashboard</title>
      <div className="main-content">
        <Header />

        <main>
          <section className="task-details-container">
            <TasksProgressContainer tickets={tickets} firstName={firstName} />

          </section>

          <section className="task-list-container p-inline-1rem white-bg rounded-8px">
            <div className="list-container p-block-1rem">
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

            <ul className="task-list">
              {tickets && tickets.length === 0 && (
                <li className="no-task-yet item-container p-block-1rem">
                  No tickets yet.
                </li>
              )}

              {tickets.map((ticket) => {
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
                );
              })}
            </ul>
          </section>

          <LogoutBtnContainer />
        </main>
      </div>
    </>
  );
}
