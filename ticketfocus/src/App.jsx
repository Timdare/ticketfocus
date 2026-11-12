import axios from "axios";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { PrevTicketPage } from "./pages/PrevTicketPage.jsx";
import { AllTicketsPage } from "./pages/AllTicketsPage.jsx";
import { AllUsersPage } from "./pages/AllUsersPage.jsx";
import { AddUser } from "./pages/AddUser.jsx";
import { UpdateUser } from "./pages/UpdateUser.jsx";
import { PageNotFound } from "./pages/PageNotFound.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState({});
  const [isEditingTicket, setIsEditingTicket] = useState({
    status: false,
    ticket: {},
  });
  const [displayInputContainer, setDisplayInputContainer] = useState(false);
  const [inputValues, setInputValues] = useState({
    text: "",
    office: "701",
  });

  function updateInputs(ticket) {
    setInputValues({
      text: ticket.text,
      office: ticket.office,
    });
  }

  const loadTickets = async (date) => {
    try {
      const response = await axios.get(`/api/tickets/ticketdate/${date}`);
      setTickets(response.data.tickets ? response.data.tickets : []);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.get("/api/auth/userdetails");
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard
                tickets={tickets}
                setTickets={setTickets}
                loadTickets={loadTickets}
                user={user}
                updateUser={updateUser}
                inputValues={inputValues}
                setInputValues={setInputValues}
                isEditingTicket={isEditingTicket}
                setIsEditingTicket={setIsEditingTicket}
                updateInputs={updateInputs}
                displayInputContainer={displayInputContainer}
                setDisplayInputContainer={setDisplayInputContainer}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="prev-ticket/:ticketDateParams"
          element={
            <ProtectedRoute>
              <PrevTicketPage
                tickets={tickets}
                setTickets={setTickets}
                loadTickets={loadTickets}
                user={user}
                updateUser={updateUser}
                inputValues={inputValues}
                setInputValues={setInputValues}
                isEditingTicket={isEditingTicket}
                setIsEditingTicket={setIsEditingTicket}
                updateInputs={updateInputs}
                displayInputContainer={displayInputContainer}
                setDisplayInputContainer={setDisplayInputContainer}
              />
            </ProtectedRoute>
          }
        />
        <Route 
          path="all-tickets"
          element={
            <ProtectedRoute>
              <AllTicketsPage 
                user={user} 
                updateUser={updateUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="all-users"
          element={
            <ProtectedRoute>
              <AllUsersPage 
                user={user}
                updateUser={updateUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-user"
          element={
            <ProtectedRoute>
              <AddUser 
                user={user}
                updateUser={updateUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="update-user/:user_id"
          element={
            <ProtectedRoute>
              <UpdateUser 
                user={user}
                updateUser={updateUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={<LoginPage setUser={setUser} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
