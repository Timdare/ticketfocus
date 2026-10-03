import axios from "axios";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { PrevTicketPage } from "./pages/PrevTicketPage.jsx";
import { PageNotFound } from "./pages/PageNotFound.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [firstName, setFirstName] = useState("user");
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
  const updateFirstName = async () => {
    try {
      const response = await axios.get("/api/auth/userdetails");
      setFirstName(response.data.user.first_name);
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
                firstName={firstName}
                updateFirstName={updateFirstName}
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
                firstName={firstName}
                updateFirstName={updateFirstName}
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
          path="login"
          element={<LoginPage setFirstName={setFirstName} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
