import { useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  return (
    <>
      <Routes>
        <Route index element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

    </>
  );
}

export default App;
