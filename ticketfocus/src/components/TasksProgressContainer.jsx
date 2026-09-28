import { useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import "./TasksProgressContainer.css";

export function TasksProgressContainer({
  user,
  date,
  ticketDate,
  setTicketDate,
  page,
  ticketDateParams,

  tickets
}) {
  const navigate = useNavigate();

  // const dates = [
  //   ...new Set(
  //     user.tasks.map((task) => dayjs(task.createdAt).format("YYYY-MM-DD")),
  //   ),
  // ];
  // const reversedDates = dates.toReversed();
  // const pastTicketsExist = dates.some((d) => d !== date);

  // const viewPastTicket = (e) => {
  //   setTicketDate(e.target.value);
  //   if (ticketDate === "today") navigate("/");
  //   navigate(`/prev-ticket/${e.target.value}`);
  // };

  // const psuedoTasks = user.tasks.map((task) => {
  //   return {
  //     id: task.id,
  //     completed: task.completed,
  //     text: task.text,
  //     createdAt: dayjs(task.createdAt).format("YYYY-MM-DD"),
  //     office: task.office,
  //   };
  // });

  // let userTasksCopy;
  // if (page === "dashboard") {
  //   userTasksCopy = psuedoTasks.filter(
  //     (task) => task.createdAt === dayjs().format("YYYY-MM-DD"),
  //   );
  // }
  // if (page === "prev-ticket") {
  //   userTasksCopy = psuedoTasks.filter(
  //     (task) => task.createdAt === ticketDateParams,
  //   );
  // }

  // useEffect(() => {
  //   if (page === "dashboard") setTicketDate("today");
  //   if (page === "prev-ticket") setTicketDate(ticketDateParams);
  // }, [page]);

  // const totalTasks = userTasksCopy ? userTasksCopy.length : 0;
  // const completeTasks = userTasksCopy
  //   ? userTasksCopy.filter((task) => task.completed === true)
  //   : [];
  // const completeTasksPercent =
  //   totalTasks > 0 ? (completeTasks.length / totalTasks) * 100 : 0;
  // const totalTasks = user.tasks ? user.tasks.length : 0;
  // const completeTasks = user.tasks
  //   ? user.tasks.filter((task) => task.completed === true)
  //   : [];
  // const completeTasksPercent =
  //   totalTasks > 0 ? (completeTasks.length / totalTasks) * 100 : 0;

  const totalTickets = tickets ? tickets.length : 0;
  const completeTickets = tickets
    ? tickets.filter((task) => task.completed === true)
    : [];

  const completeTicketsPercent =
    totalTickets > 0 ? (completeTickets.length / totalTickets) * 100 : 0;

  return (
    <>
      {/* <section className="tasks-progress-container white-bg rounded-8px p-inline-1rem">
        <h3 className="dark-grey-text">
          {page === "dashboard"
            ? "Today's Tickets"
            : `Tickets for ${dayjs(ticketDate).format("DD MMM, YYYY")}`}
        </h3>
        <p className="mt-8px">
          Welcome {user.firstname}
          {user.isAdmin && <i>(Admin)</i>}.
        </p>

        <div className="tasks-progress mt-16px">
          <div className="task-progress-status">
            <span className="task-progress-status-text">
              {completeTasks.length} of {totalTasks}{" "}
              {totalTasks === 1 ? "ticket" : "tickets"} completed
            </span>
            <span className="task-progress-status-percent dark-blue">
              {Math.floor(completeTasksPercent)}%
            </span>
          </div>

          <div className="progress-bar mt-16px">
            <div
              className="progress-fill"
              style={{ width: `${completeTasksPercent.toFixed(2)}%` }}
            ></div>
          </div>
        </div>

        {pastTicketsExist && (
          <select
            className="past-tickets"
            onChange={viewPastTicket}
            value={ticketDate}
          >
            <option value="today">Today's Tickets</option>

            {reversedDates.map((d) => {
              return (
                d !== date && (
                  <option
                    key={d}
                    value={d}
                    title={dayjs(d).format("dddd D MMM, YYYY")}
                  >
                    {d === dayjs().format("YYYY-MM-DD")
                      ? "Today's ticket"
                      : dayjs(d).format("MMM DD, YYYY")}
                  </option>
                )
              );
            })}
          </select>
        )}
      </section> */}


      <section className="tasks-progress-container white-bg rounded-8px p-inline-1rem">
        <h3 className="dark-grey-text">Today's Tickets</h3>
        <p className="mt-8px">Welcome Timi!</p>

        <div className="tasks-progress mt-16px">
          <div className="task-progress-status">
            <span className="task-progress-status-text">
              {completeTickets.length} of {totalTickets} {" "}
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

        <select id="" className="past-tickets">
          <option value="" title="Monday 28th Sep, 2026">Today's tickets</option>
          <option value="" title="Monday 28th Sep, 2026">Today's tickets</option>
        </select>
      </section>
    </>
    
  );
}
