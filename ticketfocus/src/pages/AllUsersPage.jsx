import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { LogoutBtnContainer } from "../components/LogoutBtnContainer";
import "./AllTicketsPage.css";

export function AllUsersPage({ user, updateUser }) {
  const [users, setUsers] = useState([]);

  const getUsers =  async () => {
    try {
      const res = await axios.get("/api/admin/getusers");
      setUsers(res.data.users);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
      setUsers([]);
    }
  }

  useEffect(() => {
    updateUser();

    // GET USER DETAILS
    // axios
    //   .get("/api/admin/getusers")
    //   .then((res) => {
    //     setUsers(res.data.users);
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    const callGetUsers = () => {
      getUsers();
    }
    callGetUsers();
  }, []);

  return (
    <>
      <title>TicketFocus - All users</title>

      <div className="main-content">
        <Header />

        {user.role === "admin" ? (
          <main>
            <p className="dark-blue letter-spacing-2px text-transform-uppercase m-0 admin-workspace-text">
              ADMIN WORKSPACE
            </p>
            <section className="page-info d-flex gp-1">
              <div className="page-desc">
                <h1 className="m-0">Users Management</h1>
                <p className="dark-grey-text mt-0">
                  Manage users in the IT support team.
                </p>
              </div>
              <Link to="/add-user" className="dark-blue-bg white-text add-ticket-btn">
                <i className="fa-solid fa-user-plus"></i> Add User
              </Link>
            </section>

            <section className="tickets-details-container gp-1 mt-16px">
              <div className="detail-container p-inline-1rem p-block-1rem white-bg rounded-8px">
                <div className="details-header d-flex justify-content-space-between align-items-center mt-0">
                  <h5 className="text-transform-uppercase dark-grey-text">
                    Total Users
                  </h5>
                  <span className="details-header-icon rounded-8px light-grey-bg">
                    <i className="fa-regular fa-clipboard dark-blue"></i>
                  </span>
                </div>
                <span className="details-no">{users ? users.length : 0}</span>
              </div>
            </section>

            <div style={{ overflowX: "auto" }}>
              <table className="tickets-table mt-16px rounded-8px">
                <thead className="text-transform-uppercase light-grey-bg dark-grey-text">
                  <tr>
                    <th>user details</th>
                    <th>Role</th>
                    <th>No. of Tickets</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody className="centered-text">
                  {users.length ?
                    users.map((user) => {
                      return (
                        // <tr>
                        //   <td>
                        //     <span className="text-transform-capitalize">
                        //       {user.last_name + " " + user.first_name}
                        //     </span>
                        //     <br />
                        //     <span className="dark-grey-text">
                        //       {user.user_name}
                        //     </span>
                        //   </td>
                        //   <td>{user.role}</td>
                        //   <td>{user.userTicketsCount}</td>
                        //   <td>
                        //     <button className="light-blue cursor-pointer">
                        //       view / edit
                        //     </button>{" "}
                        //     <span 
                        //       className="delete-icon-container dark-grey-text"
                        //       onClick={()=>{}}
                        //     >
                        //       <i className="fa-solid fa-trash-can delete-icon"></i>
                        //     </span>
                        //   </td>
                        // </tr>
                       
                        <UserRow key={user.id} user={user} getUsers={getUsers} />
                        
                      );
                    }) : (null)
                  }

                  
                </tbody>
              </table>
            </div>


            <LogoutBtnContainer />
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

        <hr />

        <footer className="mt-16px">
          <p className="dark-grey-text admin-enabled-text">
            <i>Admin mode enabled</i>
          </p>
        </footer>
      </div>
    </>
  );
}


function UserRow({user,getUsers}) {

  const deleteUser = async () => {
   try {
    const res = await axios.delete(`/api/admin/deleteuser/${user.id}`);
    alert(res.data.message);
    await getUsers();
   } catch (error) {
    console.log(error.response);
   }
  }

  return(
    <>
      <tr>
        <td>
          <span className="text-transform-capitalize">
            {user.last_name + " " + user.first_name}
          </span>
          <br />
          <span className="dark-grey-text">
            {user.user_name}
          </span>
        </td>
        <td>{user.role}</td>
        <td>{user.userTicketsCount}</td>
        <td>
          <Link to={`/update-user/${user.id}`} className="light-blue cursor-pointer view-edit-btn">
            view / edit
          </Link>{" "}
          {user.role !== "admin" && <span 
              className="delete-icon-container dark-grey-text"
              onClick={deleteUser}
            >
              <i className="fa-solid fa-trash-can delete-icon"></i>
            </span>
          }
          
        </td>
      </tr>

    </>
  );
}