import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("/api/auth/verifyuser")
      .then((res) => {
        if (res.data.success) {
          setAuthenticated(true);
        } else {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return authenticated ? children : null;
}
