import { useState } from "react";
import { useNavigate } from "react-router";
import { updateLocalStorage } from "../utils/updateLocalStorage";
import "./LoginPage.css";

export function LoginPage({ users, setOngoingSess }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  function togglePasswordVisibility(){
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle login logic here
    const user = users.find((u) => u.username === username.toLowerCase() && u.password === password);

    const ongoingSess = {
      userId: user ? user.userId : null,
    }

    console.log(ongoingSess.userId);

    if (user) {
      // Login successful
      console.log("Login successful!");
      updateLocalStorage("ongoingSess", ongoingSess);
      setOngoingSess(ongoingSess);
      navigate("/",{ replace: true });

    } else {
      // Login failed
      console.log("Login failed!");
      setLoginError("Invalid username/password");
    }
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
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-icon toggle-visibility-icon" onClick={togglePasswordVisibility}>
                {hidePassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </div>
            </div>

            {loginError && <p className="login-error-message m-0">{loginError}</p>}

            <button type="submit" className="login-btn dark-blue-bg" onClick={handleSubmit}>
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
