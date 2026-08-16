import { useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import {ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

function App() {

  // const users = [
  //   {
  //     userId: "staff-0001",
  //     firstname: "Oluwatimilehin",
  //     lastname: "Atandare",
  //     username: function () {
  //       return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`;
  //     },
  //     password: "123456",
  //     isAdmin: true,
  //     tasks: [],
  //   },
  //   {
  //     userId: "staff-0002",
  //     firstname: "Hassan",
  //     lastname: "Olamilekan",
  //     username: function () {
  //       return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`;
  //     },
  //     password: "123456",
  //     isAdmin: false,
  //     tasks: [],
  //   },
  //   {
  //     userId: "staff-0003",
  //     firstname: "Gift",
  //     lastname: "Asuquo",
  //     username: function () {
  //       return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`;
  //     },
  //     password: "123456",
  //     isAdmin: false,
  //     tasks: [],
  //   },
  //   {
  //     userId: "staff-0004",
  //     firstname: "Moses",
  //     lastname: "Bliss",
  //     username: function () {
  //       return `${this.firstname.toLowerCase()}.${this.lastname.toLowerCase()}`;
  //     },
  //     password: "123456",
  //     isAdmin: false,
  //     tasks: [],
  //   },
  // ];

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || [
    {
      userId: 'staff-0001',
      firstname: "Oluwatimilehin",
      lastname: "Atandare",
      username: "oluwatimilehin.atandare",
      password: "123456",
      isAdmin: true,
      tasks: []
    },
    {
      userId: 'staff-0002',
      firstname: "Hassan",
      lastname: "Olamilekan",
      username: "hassan.olamilekan",
      password: "123456",
      isAdmin: false,
      tasks: []
    },
    {
      userId: 'staff-0003',
      firstname: "Gift",
      lastname: "Asuquo",
      username: "gift.asuquo",
      password: "123456",
      isAdmin: false,
      tasks: []
    },
    {
      userId: 'staff-0004',
      firstname: "Moses",
      lastname: "Bliss",
      username: "moses.bliss",
      password: "123456",
      isAdmin: false,
      tasks: []
    },
  ]);
  console.log(users);

  const [ongoingSess, setOngoingSess] = useState(() => {
    const storedSess = localStorage.getItem("ongoingSess");
    return storedSess ? JSON.parse(storedSess) : {};
  });

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard
                users={users}
                setUsers={setUsers}
                ongoingSess={ongoingSess}
              />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage users={users} setOngoingSess={setOngoingSess} />} />
      </Routes>
    </>
  );
}

export default App;
