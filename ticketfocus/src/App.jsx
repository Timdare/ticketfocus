import { useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  const users = [
    {
      userId: 'staff-0001',
      firstname: "Oluwatimilehin",
      lastname: "Atandare",
      username: function () { 
        return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`
      },
      password: "123456",
      isAdmin: true,
      tasks: []
    },
    {
      userId: 'staff-0002',
      firstname: "Hassan",
      lastname: "Olamilekan",
      username: function () { 
        return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`
      },
      password: "123456",
      isAdmin: false,
      tasks: []
    },
    {
      userId: 'staff-0003',
      firstname: "Gift",
      lastname: "Asuquo",
      username: function () { 
        return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`
      },
      password: "123456",
      isAdmin: false,
      tasks: []
    },
    {
      userId: 'staff-0004',
      firstname: "Moses",
      lastname: "Bliss",
      username: function () { 
        return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`
      },
      password: "123456",
      isAdmin: false,
      tasks: []
    },
  ]


  return (
    <>
      <Routes>
        <Route index element={<Dashboard tasks={tasks} setTasks={setTasks} users={users} />} />
        <Route path="login" element={<LoginPage users={users} />} />
      </Routes>

    </>
  );
}

export default App;
