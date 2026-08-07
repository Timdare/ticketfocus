import "./WorkSessionContainer.css";

export function WorkSessionContainer() {
  return (
    <section className="work-session-container light-blue-bg rounded-8px p-inline-1rem">
      <div>
        <i className="fa-solid fa-stopwatch fa-2x white-text"></i>
      </div>
      <p className="white-text deep-work-session-text">Deep Work Session</p>
      <p className="white-text deep-work-session-time">25:00</p>
    </section>
  );
}
