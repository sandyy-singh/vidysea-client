import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
useNavigate

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const [name,setName] =useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/userRole", {
                    withCredentials: true
                });
                setUserRole(res.data.role)
                setName(res.data.name)
                console.log("res", res.data.role)
            } catch (err) {
                setUserRole(null)
                console.log("dcfgvhbjn")
            } finally {
                setLoading(false)
            }
        }
        fetchUserRole()
    }, [])

    const logOut = async () => {
        console.log("logOut")
        try {
            const res = await axios.post("http://localhost:5000/api/auth/logOut", {}, { withCredentials: true });
            console.log("logOut", res.data)
            setUserRole(null);
            // window.location.href = "/"; // Redirect to login
            navigate('/', { replace: true });

            // push a new state so Back doesn't go to protected page
            // (this makes current page the only entry)
            window.history.pushState(null, '', '/');
            // optional: also replace state
            window.history.replaceState(null, '', '/');

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <AppContext.Provider value={{ userRole, setUserRole, loading,name, setLoading, logOut }}>
            {children}
        </AppContext.Provider>
    )
}