import dayjs from "dayjs";
import { useState } from "react";
import "./TasksProgressContainer.css";

export function TasksProgressContainer({ user }) {

  const [ticketDate, setTicketDate] = useState("");
  const dates = [...new Set(user.tasks.map(task => dayjs(task.createdAt).format("YYYY-MM-DD")))];
  console.log(dates);
  

  const viewPastTicket = e => {
    setTicketDate(e.target.value);
  }

  const totalTasks = user.tasks ? user.tasks.length : 0;
  const completeTasks = user.tasks ? user.tasks.filter((task) => task.completed === true) : [];
  const completeTasksPercent = totalTasks > 0 ? (completeTasks.length / totalTasks) * 100 : 0;

  return (
    <section className="tasks-progress-container white-bg rounded-8px p-inline-1rem">
      <h3 className="dark-grey-text">Daily Tickets</h3>
      <p className="mt-8px">Welcome {user.firstname}{user.isAdmin && <i>(Admin)</i>}.</p>

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

      <select className="past-tickets" onChange={viewPastTicket} value={ticketDate}>
        <option value="">Past Tickets</option>

        {
          dates.map(date => {
            return (
              <option 
                key={date}
                value={date}
                title={dayjs(date).format("dddd D MMM, YYYY")}
              >
                {dayjs(date).format("MMM DD, YYYY")}
              </option>
            );
          })
        }

      </select>
    </section>
  );
}
