import { useContext } from "react"
import { AppContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = ({ allowedRoles }) => {

    const { userRole, loading } = useContext(AppContext)

    if (loading) <h1>...Loading</h1>;

    if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;
    
    return <Outlet />
}


export default ProtectedRoute
