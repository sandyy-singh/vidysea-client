import  { useContext } from "react";
import { AppContext } from "../context/AuthContext";

const About = () => {
    const { userRole, loading,name } = useContext(AppContext)
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

export default About
