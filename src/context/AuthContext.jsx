// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get(
          "https://vidysea-server.onrender.com/api/auth/userRole",
          { withCredentials: true }
        );
        // set role and name from response
        setUserRole(res.data.role ?? null);
        setName(res.data.name ?? "");
        console.log("fetched role:", res.data.role, "name:", res.data.name);
      } catch (err) {
        setUserRole(null);
        setName("");
        console.error("fetchUserRole error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, []);

  const logOut = async () => {
    try {
      const res = await axios.post(
        "https://vidysea-server.onrender.com/api/auth/logOut",
        {},
        { withCredentials: true }
      );
      console.log("logOut", res.data);

      // clear context state
      setUserRole(null);
      setName("");

      // clear any client storage if you used one
      try { localStorage.removeItem("user"); } catch (e) {}
      try { sessionStorage.removeItem("user"); } catch (e) {}

      // clear axios auth header if set
      if (axios.defaults.headers.common["Authorization"]) {
        delete axios.defaults.headers.common["Authorization"];
      }

      // SPA redirect (replace so back doesn't go to protected page)
      navigate("/", { replace: true });

    } catch (err) {
      console.error("logout error:", err);
      // still clear client state to avoid stale UI
      setUserRole(null);
      setName("");
      navigate("/", { replace: true });
    }
  };

  return (
    <AppContext.Provider
      value={{ userRole, setUserRole, loading, name,setName, setName, logOut }}
    >
      {children}
    </AppContext.Provider>
  );
};
