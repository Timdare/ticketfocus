import { useState } from "react";
import "./LoginPage.css";

export function LoginPage() {
  const [hidePassword, setHidePassword] = useState(true);

  function togglePasswordVisibility(){
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  return (
    <>
      <title>TicketFocus - Login</title>

      <div className="main-content-login">
        <section className="form-container white-bg rounded-8px">
          <h2 className="centered-text">Welcome to TicketFocus!</h2>
          <p className="dark-grey-text centered-text m-0">Login to continue to your dashboard.</p>

          <form className="login-form">
            <div className="login-input-container">
              <div className="input-icon">
                <i className="fa-regular fa-user"></i>
              </div>

              <input
                type="text"
                className="light-grey-bg rounded-8px"
                placeholder="Username"
              />
            </div>

            <div className="login-input-container">
              <div className="input-icon">
                <i className="fa-solid fa-lock"></i>
              </div>

              <input
                type={hidePassword ? "password" : "text"}
                className="light-grey-bg rounded-8px"
                placeholder="Password"
              />
              <div className="input-icon toggle-visibility-icon" onClick={togglePasswordVisibility}>
                {hidePassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </div>
            </div>

            <button type="submit" className="login-btn dark-blue-bg">
              Log In <i className="fa-solid fa-arrow-right login-icon"></i>
            </button>
          </form>

          <div className="centered-text">
            <a href="#" className="forgot-password-link dark-blue">
              Forgot Password?
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
