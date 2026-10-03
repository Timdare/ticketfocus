import axios from "axios";
import { useEffect } from "react";
import "./LogoutBtnContainer.css";

export function LogoutBtnContainer() {
  const logoutUser = async () => {
    // localStorage.removeItem("ongoingSess");

    try {
      const res = await axios.get("/api/auth/logout");
      alert(res.data.message);
      location.reload(true);

      window.location.replace("/login");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <div className="logout-btn-container">
      <button className="logout-btn" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
}
