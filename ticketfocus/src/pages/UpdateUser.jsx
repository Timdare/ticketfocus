import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import "./UserDetails.css";

export function UpdateUser({ user, updateUser }) {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { user_id } = params;

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`/api/admin/getuserdetails/${user_id}`);
      console.log(res.data);
      setCurrentUser(res.data.details);
      setInputValues({
        firstName: res.data.details.first_name,
        lastName: res.data.details.last_name,
        role: res.data.details.user_role,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async () => {
    try {
        const res = await axios.put(`/api/admin/updateuser/${user_id}`, inputValues);
        alert(res.data.message);
        await getUserDetails();
    } catch (error) {
        console.log(error.response.message);
    }
  }

  useEffect(() => {
    updateUser();
    function callGetUserDetails() {
      getUserDetails();
    }
    callGetUserDetails();
  }, []);

  if(isLoading) {
    return (
      <div>Retrieving user details...</div>
    );
  }

  return (
    <>
      <title>TicketFocus - All users</title>

      <div className="main-content">
        <Header />

        {user.role === "admin" ? (
          <main>
            <div className="mt-16px m-block-1rem">
              <Link
                to="/all-users"
                className="dark-grey-text back-to-users-link"
              >
                <i className="fa-solid fa-arrow-left back-icon"></i> Back to
                Users
              </Link>
            </div>

            <section className="user-desc mt-16px d-flex white-bg p-inline-2rem p-block-1rem rounded-8px m-block-1rem">
              <div className="user-profile">
                <h2 className="text-transform-capitalize">
                  {currentUser.first_name} {currentUser.last_name}
                </h2>
                <p className="dark-grey-text">{currentUser.user_role}</p>
              </div>
              <div className="tickets-no-info p-inline-1rem">
                <h5 className="dark-grey-text">NO. OF TICKETS</h5>
                <p>
                  {currentUser.tickets.length ? currentUser.tickets.length : 0}{" "}
                  {currentUser.tickets.length === 1 ? "Ticket" : "Tickets"}
                </p>
              </div>
            </section>

            <section className="form-data white-bg p-block-2rem p-inline-2rem mt-16px rounded-8px">
              <div className="form-header d-flex">
                <div className="form-info">
                  <h3>User Information</h3>
                  <p className="dark-grey-text mt-0">
                    Add or update Staff information.
                  </p>
                </div>

                <div className="d-flex form-btns">
                  <button className="dark-grey-text reset-btn" onClick={getUserDetails}>Cancel</button>
                  <button className="dark-blue-bg white-text add-save-btn rounded-8px" onClick={handleSubmit}>
                    Update User
                  </button>
                </div>
              </div>

              <form className="mt-16px">
                <div>
                  <label htmlFor="fname">First Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={inputValues.firstName}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="fname">Last Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={inputValues.lastName}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="fname">Role</label>
                  <br />
                  <select
                    value={inputValues.role}
                    onChange={(e) =>
                      setInputValues({ ...inputValues, role: e.target.value })
                    }
                  >
                    <option value="IT-Staff">IT staff</option>
                  </select>
                </div>
              </form>
            </section>

            <section className="tickets-container mt-16px white-bg rounded-8px m-block-1rem p-block-1rem p-inline-2rem">
              <div className="tickets-container-header d-flex p-block-1rem">
                <div className="tickets-container-info">
                  <h4>Assigned Tickets</h4>
                  <p className="dark-grey-text mt-0">
                    View all tickets assigned to this user.
                  </p>
                </div>
                <div className="d-flex filter-container light-grey-bg rounded-8px">
                  <span className="filter-btn active">All</span>
                  <span className="filter-btn">Pending</span>
                  <span className="filter-btn">Completed</span>
                </div>
              </div>

              <ul className="tickets-list">
                {currentUser.tickets.length === 0 && (
                  <p className="dark-grey-text">
                    No tickets assigned to this user yet.
                  </p>
                )}
                {currentUser.tickets.map((ticket) => {
                  return (
                    <li key={ticket.id} className="ticket-item d-flex p-block-1rem p-inline-1rem rounded-8px">
                      <div className="d-flex ticket-item-text-container">
                        <input
                          type="checkbox"
                          checked={ticket.completed}
                          className="check"
                          readOnly
                        />
                        <div className="ticket-item-desc">
                          <span>{ticket.text}</span>
                          <br />
                          <span className="dark-grey-text">
                            <i className="fa-regular fa-calendar"></i> {dayjs(ticket.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </div>
                      </div>

                      <div className="ticket-item-utils d-flex">
                        <span className="office">{ticket.office}</span>
                      </div>
                    </li>
                  );
                })}
                {/* <li className="ticket-item d-flex p-block-1rem p-inline-1rem rounded-8px">
                  <div className="d-flex ticket-item-text-container">
                    <input
                      type="checkbox"
                      // checked={false}
                      className="check"
                    />
                    <div className="ticket-item-desc">
                      <span>stuff</span>
                      <br />
                      <span className="dark-grey-text">
                        <i className="fa-regular fa-calendar"></i> 23rd Sept,
                        2026
                      </span>
                    </div>
                  </div>

                  <div className="ticket-item-utils d-flex">
                    <span className="office">704</span>
                  </div>
                </li> */}
              </ul>
            </section>
          </main>
        ) : (
          <div className="forbidden-err-container">
            <h1>Error: 403(FORBIDDEN)</h1>
            <p>You don't have access to this page</p>
            <p>
              Click <Link to="/">here</Link> to return to home!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
