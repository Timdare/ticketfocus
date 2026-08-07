import "./TasksProgressContainer.css";

export function TasksProgressContainer({ tasks }) {
  const totalTasks = tasks.length;
  const completeTasks = tasks.filter((task) => task.completed === true);
  const completeTasksPercent = (completeTasks.length / totalTasks) * 100;

  return (
    <section className="tasks-progress-container white-bg rounded-8px p-inline-1rem">
      <h3 className="dark-grey-text">Daily Progress</h3>
      <p className="mt-8px">Focus on what matters</p>

      <div className="tasks-progress mt-16px">
        <div className="task-progress-status">
          <span className="task-progress-status-text">
            {completeTasks.length} of {totalTasks}{" "}
            {totalTasks === 1 ? "task" : "tasks"} completed
          </span>
          <span className="task-progress-status-percent dark-blue">
            {completeTasksPercent ? Math.floor(completeTasksPercent) : 0}%
          </span>
        </div>

        <div className="progress-bar mt-16px">
          <div
            className="progress-fill"
            style={{ width: `${completeTasksPercent.toFixed(2)}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}
