import "./LoginPage.css";

export function LoginPage() {
  return (
    <>
      <title>TicketFocus - Login</title>

      <div className="main-content">
        <section className="form-container white-bg rounded-8px">
          <h2>Welcome to TicketFocus!</h2>
          <p className="dark-grey-text">Login to continue to your dashboard.</p>

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
                type="password"
                className="light-grey-bg rounded-8px"
                placeholder="Password"
              />
              <div className="input-icon toggle-visibility-icon">
                <i className="fa-regular fa-eye-slash"></i>
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
