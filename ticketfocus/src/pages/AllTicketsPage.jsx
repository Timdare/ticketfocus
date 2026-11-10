import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";
import "./AllTicketsPage.css";

export function AllTicketsPage({ user, updateUser }) {
    console.log(user);

    const [users,setUsers] = useState([]);
    const [tickets, setTickets] = useState({});

    useEffect(()=>{
        updateUser();
        
        // GET USERS' DETAILS
        axios.get("/api/admin/getusers")
            .then(res => {
                setUsers(res.data.users)
            })
            .catch(err => {
                console.log(err.response);
                setUsers([]);
            })

        // GET TICKETS' DETAILS
        axios.get("/api/admin/all-tickets")
            .then(res => {
                console.log(res.data.tickets);
                setTickets(res.data.tickets);
            })
            .catch(err => {
                console.log(err.response);
                setTickets({});
            });
    },[])
    return(
        <>
            <title>TicketFocus - All-tickets</title>

            <div className="main-content">
                <Header />

                {user.role === "admin" ? (
                    <main>
                        <p className="dark-blue letter-spacing-2px text-transform-uppercase m-0 admin-workspace-text">ADMIN WORKSPACE</p>
                        <section className="page-info d-flex gp-1">
                            <div className="page-desc">
                                <h1 className="m-0">All Tickets Overview</h1>
                                <p className="dark-grey-text mt-0">Monitor and manage tickets across all team members in real-time.</p>
                            </div>
                            <button className="dark-blue-bg white-text add-ticket-btn">Add new ticket</button>
                        </section>

                        <section className="tickets-details-container gp-1 mt-16px">
                            <div className="detail-container p-inline-1rem p-block-1rem white-bg rounded-8px">
                                <div className="details-header d-flex justify-content-space-between align-items-center mt-0">
                                    <h5 className="text-transform-uppercase dark-grey-text">Total Tickets</h5>
                                    <span className="details-header-icon rounded-8px light-grey-bg">
                                        <i className="fa-regular fa-clipboard dark-blue"></i>
                                    </span>
                                </div>
                                <span className="details-no">{tickets.totalTickets}</span>
                            </div>
                            
                            <div className="detail-container p-inline-1rem p-block-1rem white-bg rounded-8px">
                                <div className="details-header d-flex justify-content-space-between align-items-center mt-0">
                                    <h5 className="text-transform-uppercase dark-grey-text">completed</h5>
                                    <span className="details-header-icon rounded-8px light-grey-bg">
                                        <i className="fa-regular fa-circle-check" style={{color: "#006687"}}></i>
                                    </span>
                                </div>
                                <span className="details-no">{tickets.completeTickets}</span>
                            </div>

                            <div className="detail-container p-inline-1rem p-block-1rem white-bg rounded-8px">
                                <div className="details-header d-flex justify-content-space-between align-items-center mt-0">
                                    <h5 className="text-transform-uppercase dark-grey-text">Pending</h5>
                                    <span className="details-header-icon rounded-8px light-grey-bg">
                                        <i className="fa-solid fa-ellipsis dark-grey-text"></i>
                                    </span>
                                </div>
                                <span className="details-no">{tickets.pendingTickets}</span>
                            </div>
                            
                            <div className="detail-container p-inline-1rem p-block-1rem white-bg rounded-8px">
                                <div className="details-header d-flex justify-content-space-between align-items-center mt-0">
                                    <h5 className="text-transform-uppercase dark-grey-text">Total users</h5>
                                    <span className="details-header-icon rounded-8px light-grey-bg">
                                        <i className="fa-solid fa-users"></i>
                                    </span>
                                </div>
                                <span className="details-no">{users.length ? users.length : 0}</span>
                            </div>

                        </section>
        
                        <section className="filter-container white-bg d-flex p-block-1rem p-inline-1rem mt-16px rounded-8px gp-1">
                            <div className="filter-users-container d-flex light-grey-bg rounded-8px">
                                <div className="user active">All</div>

                                {users.length && users.map(u => {
                                    return(
                                        <div key={u.id} className="user dark-grey-text">{u.first_name}</div>
                                    );
                                })}

                                {/* <div className="user dark-grey-text">Oluwatimilehin</div>
                                <div className="user dark-grey-text">Hassan</div>
                                <div className="user dark-grey-text">Gift</div>
                                <div className="user dark-grey-text">Mario</div>
                                <div className="user dark-grey-text">Paul</div> */}
                            </div>
                            <select className="completion-status-dropdown light-grey-bg rounded-8px">
                                <option value="all">All</option>
                                <option value="completed">Status: completed</option>
                                <option value="pending">Status: pending</option>
                            </select>
                        </section>    

                        <div style={{"overflowX": "auto"}}>
                            <table className="tickets-table mt-16px rounded-8px">
                                <thead className="text-transform-uppercase light-grey-bg dark-grey-text">
                                    <tr>
                                        <th>Status</th>
                                        <th>Ticket description</th>
                                        <th>creator</th>
                                        <th>office</th>
                                        <th>creation date</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody className="centered-text">

                                    {tickets && tickets.allTickets && tickets.allTickets.length && tickets.allTickets.map(ticket => {

                                        return(
                                            <tr key={ticket.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        id={"ticket.id"}
                                                        className="check"
                                                        // checked={false}
                                                        onChange={()=>{}}
                                                        title="Mark as complete"
                                                    />
                                                </td>
                                                <td className="text-align-left">{ticket.text}</td>
                                                <td className="text-transform-capitalize">{ticket.creator}</td>
                                                <td>{ticket.office}</td>
                                                <td>{dayjs(ticket.createdAt).format("MMM DD, YYYY")}</td>
                                                <td>
                                                    <span className="delete-icon-container">
                                                        <i className="fa-solid fa-trash-can delete-icon dark-grey-text"></i>
                                                    </span>
                                                </td>
                                            </tr>  
                                        );
                                        

                                    })}
        {/* 
                                    <tr>
                                        <td>
                                            <input
                                                type="checkbox"
                                                id={"ticket.id"}
                                                className="check"
                                                // checked={false}
                                                onChange={()=>{}}
                                                title="Mark as complete"
                                            />
                                        </td>
                                        <td>Crimped an ethernet cable for use in an office</td>
                                        <td>Oluwatimilehin</td>
                                        <td>703</td>
                                        <td>Oct 24,2026</td>
                                        <td>
                                            <span className="delete-icon-container">
                                                <i className="fa-solid fa-trash-can delete-icon dark-grey-text"></i>
                                            </span>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <input
                                                type="checkbox"
                                                id={"ticket.id"}
                                                className="check"
                                                // checked={false}
                                                onChange={()=>{}}
                                                title="Mark as complete"
                                            />
                                        </td>
                                        <td>Connected multiple guests to the company wi-fi network for use in a board meeting</td>
                                        <td>Oluwatimilehin</td>
                                        <td>703</td>
                                        <td>Oct 24,2026</td>
                                        <td>
                                            <span className="delete-icon-container dark-grey-text">
                                                <i className="fa-solid fa-trash-can delete-icon"></i>
                                            </span>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <input
                                                type="checkbox"
                                                id={"ticket.id"}
                                                className="check"
                                                // checked={false}
                                                onChange={()=>{}}
                                                title="Mark as complete"
                                            />
                                        </td>
                                        <td>Crimped an ethernet cable for use in an office</td>
                                        <td>Oluwatimilehin</td>
                                        <td>703</td>
                                        <td>Oct 24,2026</td>
                                        <td>
                                            <span className="delete-icon-container">
                                                <i className="fa-solid fa-trash-can delete-icon dark-grey-text"></i>
                                            </span>
                                        </td>
                                    </tr> */}

                                </tbody>
                            </table>

                        </div>                    
                                
                       
                        <LogoutBtnContainer />
                    </main>
                ) : (
                    <div className="forbidden-err-container">
                        <h1>Error: 403(FORBIDDEN)</h1>
                        <p>You don't have access to this page</p>
                        <p>Click <Link to="/">here</Link> to return to home!</p>
                    </div>
                )}
                


                <hr />

                <footer className="mt-16px">
                    <p className="dark-grey-text admin-enabled-text"><i>Admin mode enabled</i></p>
                </footer>
                
            </div>

            
        </>
    );
}