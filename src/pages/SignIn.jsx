import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AuthContext";



const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const { userRole, setUserRole } = useContext(AppContext)
  useEffect(() => {
    if (userRole) {
      navigate(`/dashboard/${userRole}`);
    }
  }, [userRole, navigate]);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload na ho
    console.log('Form Submitted:', formData);

    try {
      const res = await axios.post("https://vidysea-server.onrender.com/api/auth/login", formData, {
        withCredentials: true
      })
      console.log(res.data)
      
      alert(res.data.message)
      console.log(res.data.role)
      setUserRole(res.data.role)

    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className='signup'>
      <div className='signupBox'>
        <h3 className='sign-up-head'>SignIn</h3>
        <form className='form-box' onSubmit={handleSubmit}>
          <div className='wraped'>
            <label>Email</label>
            <input
              className='form-input'
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='wraped'>
            <label>Password</label>
            <input
              className='form-input'
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Sign In</button>
        </form>

      </div>
    </div>
  )
}

export default SignIn
