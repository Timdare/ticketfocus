import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { TasksProgressContainer } from "../components/TasksProgressContainer";
import { InputContainer } from "../components/InputContainer";
import { ItemContainer } from "../components/ItemContainer";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";

export function PrevTicketPage({
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

  useEffect(() => {
    loadTickets(ticketDateParams);
    updateFirstName();
    setDisplayInputContainer(false);
  }, []);

  if (tickets.length === 0) {
    navigate("/");
  }

  return (
    <>
      <title>TicketFocus - Prev. Tickets</title>

      <div className="main-content">
        <Header />

        <main>
          <section className="task-details-container">
            <TasksProgressContainer
              tickets={tickets}
              firstName={firstName}
              ticketDateParams={ticketDateParams}
            />
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
