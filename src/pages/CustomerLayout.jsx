// src/layouts/CustomerLayout.jsx (या जहाँ तुम्हारा layout है)
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AuthContext";
import "./CustomerLayout.scss";
import { FaUserCircle } from "react-icons/fa";

const DashboardLayout = () => {
  const { logOut, name } = useContext(AppContext);

  return (
    <div className="layout">
      <div className="sidebar">
        <div>
          <h3>VidySea</h3>
          <nav className="nav">
            <Link to="NoteCurd">Note CRUD</Link>
            <Link to="Home">Home</Link>
            <Link to="About">About</Link>
            <Link to="ContactUs">ContactUs</Link>
          </nav>
        </div>

        <div>
          <button onClick={logOut} className="logout">
            Logout
          </button>
        </div>
      </div>

      <div className="main">
        <div className="header">
          <h3>Dashboard</h3>
          <div>
            <span>{name }</span>
            <FaUserCircle />
          </div>
        </div>

        <div className="routing-view">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
