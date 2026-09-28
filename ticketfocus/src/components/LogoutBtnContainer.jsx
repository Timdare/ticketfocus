import "./LogoutBtnContainer.css";

export function LogoutBtnContainer() {
  const logoutUser = () => {
    localStorage.removeItem("ongoingSess");
    window.location.replace("/login");
  };

  return (
    <div className="logout-btn-container">
      <button 
        className="logout-btn" 
        // onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
}
