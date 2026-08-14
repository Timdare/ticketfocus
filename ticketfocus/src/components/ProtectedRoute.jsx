import { Navigate } from "react-router";

export function ProtectedRoute({ children }) {
  const ongoingSess = JSON.parse(localStorage.getItem("ongoingSess")) || {};
  return ongoingSess.userId ? children : <Navigate to="/login" replace />;
}