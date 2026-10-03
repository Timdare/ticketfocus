import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { PrevTicketPage } from "./pages/PrevTicketPage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { getCurrentPage } from "./utils/getCurrentPage.js";
import "./App.css";
import dayjs from "dayjs";

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

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [
      {
        userId: "staff-0001",
        firstname: "Oluwatimilehin",
        lastname: "Atandare",
        username: "oluwatimilehin.atandare",
        password: "123456",
        isAdmin: true,
        tasks: [],
      },
      {
        userId: "staff-0002",
        firstname: "Hassan",
        lastname: "Olamilekan",
        username: "hassan.olamilekan",
        password: "123456",
        isAdmin: false,
        tasks: [],
      },
      {
        userId: "staff-0003",
        firstname: "Gift",
        lastname: "Asuquo",
        username: "gift.asuquo",
        password: "123456",
        isAdmin: false,
        tasks: [],
      },
      {
        userId: "staff-0004",
        firstname: "Moses",
        lastname: "Bliss",
        username: "moses.bliss",
        password: "123456",
        isAdmin: false,
        tasks: [],
      },
    ],
  );
  console.log(users);

  const [ongoingSess, setOngoingSess] = useState(() => {
    const storedSess = localStorage.getItem("ongoingSess");
    return storedSess ? JSON.parse(storedSess) : {};
  });

  const [input, setInput] = useState("");
  const [officeSelected, setOfficeSelected] = useState("701");
  // const [displayInputContainer, setDisplayInputContainer] = useState(false);
  const [page, setPage] = useState("dashboard");
  // const [isEditingTicket, setIsEditingTicket] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState({});
  const [ticketDate, setTicketDate] = useState("today");

  // function updateInputs(name, office) {
  //   setInput(name);
  //   setOfficeSelected(office);
  // }

  const [tickets,setTickets] = useState([]);
  const [firstName, setFirstName] = useState("user");
  const [isEditingTicket, setIsEditingTicket] = useState({
    status: false,
    ticket: {}
  });
  const [displayInputContainer,setDisplayInputContainer] = useState(false);
  const [inputValues, setInputValues] =  useState({
    text: "",
    office: "701"
  });

  function updateInputs(ticket) {
    setInputValues({
      text: ticket.text,
      office: ticket.office
    });
  }
  const dummyTickets = [
    {
      id: 30,
      text: "replaced the faulty RAM of a PC",
      office: "708",
      completed: false,
      createdAt: 1791033452457
    },
    {
      id: 31,
      text: "replaced the faulty RAM of a PC",
      office: "708",
      completed: false,
      createdAt: 1791033452457
    },
    {
      id: 32,
      text: "replaced the faulty RAM of a PC",
      office: "708",
      completed: false,
      createdAt: 1791033452457
    }
  ]

  const loadTickets = async (date) => {
    try {
      // if (getCurrentPage() === "/") {
      //   const response = await axios.get("/api/tickets/getusertickets");
      //   console.log(response.data.tickets);
      //   setTickets(response.data.tickets);
      // } else if(getCurrentPage() === "prev-ticket") {
      //   const response = await axios.get(`/api/tickets/ticketdate/${date}`)
      //   setTickets(response.data.tickets);
      // } else {
      //   setTickets([]);
      // }
      
      const response = await axios.get(`/api/tickets/ticketdate/${date}`)
      setTickets(response.data.tickets);
            
    } catch (error) {
      console.log(error.response.data);
    }
    
  }
  const updateFirstName = async () => {
    try {
      const response = await axios.get("/api/auth/userdetails");
      setFirstName(response.data.user.first_name);
    } catch (error) {
      console.log(error.response);
    }
  }
// loadTickets()


  // useEffect(()=>{
  //   function callLoadTickets() {
  //    loadTickets();
  //   }
  //   callLoadTickets();
  // },[]);

  // const taskDate = users[0].tasks[0].createdAt;
  // console.log(dayjs(taskDate).minute())
  // console.log(dayjs().valueOf())

  return (
    <>
      <Routes>
        <Route
          index
          // path="home/1"
          element={
            <ProtectedRoute>
              <Dashboard
                // users={users}
                // setUsers={setUsers}
                // ongoingSess={ongoingSess}
                // input={input}
                // setInput={setInput}
                // officeSelected={officeSelected}
                // setOfficeSelected={setOfficeSelected}
                // displayInputContainer={displayInputContainer}
                // setDisplayInputContainer={setDisplayInputContainer}
                // page={page}
                // setPage={setPage}
                // updateInputs={updateInputs}
                // isEditingTicket={isEditingTicket}
                // setIsEditingTicket={setIsEditingTicket}
                // ticketToEdit={ticketToEdit}
                // setTicketToEdit={setTicketToEdit}
                // ticketDate={ticketDate}
                // setTicketDate={setTicketDate}

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
          // path="prev-ticket"
          element={
            <ProtectedRoute>
              <PrevTicketPage
                // ongoingSess={ongoingSess}
                // users={users}
                // setUsers={setUsers}
                // input={input}
                // setInput={setInput}
                // officeSelected={officeSelected}
                // setOfficeSelected={setOfficeSelected}
                // displayInputContainer={displayInputContainer}
                // setDisplayInputContainer={setDisplayInputContainer}
                // page={page}
                // setPage={setPage}
                // updateInputs={updateInputs}
                // isEditingTicket={isEditingTicket}
                // setIsEditingTicket={setIsEditingTicket}
                // ticketToEdit={ticketToEdit}
                // setTicketToEdit={setTicketToEdit}
                // ticketDate={ticketDate}
                // setTicketDate={setTicketDate}

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
          element={<LoginPage users={users} setOngoingSess={setOngoingSess} setFirstName={setFirstName} />}
        />
      </Routes>
    </>
  );
}

export default App;
