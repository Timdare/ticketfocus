import { Link } from "react-router";
import { Header } from "../components/Header";
import "./PageNotFound.css";

export function PageNotFound() {
  return (
    <>
      <title>Ticketfocus - Page not found</title>

      <div className="main-content">
        <Header />
        <h2 className="centered-text">Oops! Page not found</h2>
        <div className="back-to-home-btn-container centered-text">
          <Link
            to="/"
            className="back-to-home-btn p-inline-1rem rounded-8px dark-blue"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
