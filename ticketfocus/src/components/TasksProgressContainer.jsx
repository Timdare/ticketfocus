import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentPage } from "../utils/getCurrentPage";
import "./TasksProgressContainer.css";

export function TasksProgressContainer({
  tickets,
  firstName,
  ticketDateParams,
}) {
  //TICKETS PROGRESS LOGIC
  const totalTickets = tickets ? tickets.length : 0;
  const completeTickets = tickets
    ? tickets.filter((task) => task.completed === true)
    : [];
  const completeTicketsPercent =
    totalTickets > 0 ? (completeTickets.length / totalTickets) * 100 : 0;

  // TICKET DATE LOGIC
  const [ticketDate, setTicketDate] = useState(
    getCurrentPage() === "prev-ticket" ? ticketDateParams : "today",
  );
  const todaysDate = dayjs().format("YYYY-MM-DD");
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const getTicketsDate = async () => {
      try {
        const res = await axios.get("/api/tickets/ticketdate");
        setDates([
          ...new Set(
            res.data.dates.map((date) => dayjs(date).format("YYYY-MM-DD")),
          ),
        ]);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getTicketsDate();
  }, []);

  const navigate = useNavigate();

  const viewPastTicket = (e) => {
    setTicketDate(e.target.value);
    if (e.target.value === "today") {
      navigate("/");
      location.reload(true);
      return;
    }
    navigate(`/prev-ticket/${e.target.value}`);
    location.reload(true);
  };

  return (
    <>
      <section className="tasks-progress-container white-bg rounded-8px p-inline-1rem">
        <h3 className="dark-grey-text">
          {getCurrentPage() === "/"
            ? "Today's Tickets"
            : `Tickets for ${dayjs(ticketDateParams).format("ddd D MMM, YYYY")}`}
        </h3>
        <p className="mt-8px">Welcome {firstName}!</p>

        <div className="tasks-progress mt-16px">
          <div className="task-progress-status">
            <span className="task-progress-status-text">
              {completeTickets.length} of {totalTickets}{" "}
              {totalTickets === 1 ? "ticket" : "tickets"} completed
            </span>
            <span className="task-progress-status-percent dark-blue">
              {Math.floor(completeTicketsPercent)}%
            </span>
          </div>

          <div className="progress-bar mt-16px">
            <div
              className="progress-fill"
              style={{ width: `${completeTicketsPercent.toFixed(2)}%` }}
            ></div>
          </div>
        </div>

        {dates.some((d) => d !== todaysDate) && (
          <select
            className="past-tickets"
            onChange={viewPastTicket}
            value={ticketDate}
          >
            <option value="today" title="Today's tickets">
              Today's tickets
            </option>

            {dates.map((date) => {
              return (
                date !== todaysDate && (
                  <option
                    key={date}
                    value={date}
                    title={dayjs(date).format("dddd D MMM, YYYY")}
                  >
                    {dayjs(date).format("MMM DD, YYYY")}
                  </option>
                )
              );
            })}
          </select>
        )}
      </section>
    </>
  );
}
