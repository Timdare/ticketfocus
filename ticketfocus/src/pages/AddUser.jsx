import { useEffect } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import "./UserDetails.css";

export function AddUser({ user, updateUser }) {
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <>
      <title>TicketFocus - All users</title>

      <div className="main-content">
        <Header />

        {user.role === "admin" ? (
          <main>
            <div className="mt-16px m-block-1rem">
                <Link to="/all-users" className="dark-grey-text back-to-users-link">
                    <i className="fa-solid fa-arrow-left back-icon"></i> {" "} Back to Users
                </Link>
            </div>

            <section className="form-data white-bg p-block-2rem p-inline-2rem mt-16px rounded-8px">
                <div className="form-header d-flex">
                    <div className="form-info">
                        <h3>User Information</h3>
                        <p className="dark-grey-text mt-0">Add or update Staff information.</p>
                    </div>

                    <div className="d-flex form-btns">
                        <button className="dark-grey-text reset-btn">Cancel</button>
                        <button className="dark-blue-bg white-text add-save-btn rounded-8px">Add User</button>
                    </div>

                </div>
                
                <form className="mt-16px">
                    <div>
                        <label htmlFor="fname">First Name</label><br />
                        <input type="text" placeholder="Enter first name" />
                    </div>
                    <div>
                        <label htmlFor="fname">Last Name</label><br />
                        <input type="text" placeholder="Enter last name" />
                    </div>
                    <div>
                        <label htmlFor="fname">Role</label><br />
                        <select>
                            <option value="it-staff">IT staff</option>
                        </select>
                    </div>
                </form>

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
