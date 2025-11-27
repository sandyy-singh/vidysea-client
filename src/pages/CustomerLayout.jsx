import { Outlet, Link } from "react-router-dom";
import  { useContext } from "react";
import { AppContext } from "../context/AuthContext";
import "./CustomerLayout.scss"
import { FaUserCircle } from "react-icons/fa";

const DashboardLayout = () => {
    const { logOut,name } = useContext(AppContext);


    return (

        <div className="layout">

            <div className="sidebar">
                <div >
                    <h3 className="">VidySea</h3>
                    <nav className="nav">
                        <Link to="NoteCurd" className="">Note CRUD </Link>
                        <Link to="Home" className="">Home</Link>
                        <Link to="About" className="">About </Link>
                        <Link to="ContactUs" className="">ContactUs </Link>



                    </nav>
                </div>

                <div>
                    <button
                        onClick={logOut}
                        className="logout"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="main">

                <div className="header">
                    <h3 className="">Dashboard</h3>
                    <div>
                        <span>{name} </span>
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
