import React, { useState } from 'react';
import "./SignUp.scss";
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload na ho
    console.log('Form Submitted:', formData);

    try {
      const res = await axios.post("https://vidysea-server.onrender.com/api/auth/register", formData, {
        withCredentials: true
      })
      console.log(res.data)
      alert(res.data.message)
      setFormData({
        name: '',
        email: '',
        password: '',
      })
    } catch (err) {
      console.log(err.message);

    }






  };

  return (
    <div className='signup'>
      <div className='signupBox'>

        <h3 className='sign-up-head'>SignUp</h3>
        <form className='form-box' onSubmit={handleSubmit}>

          <div className='wraped'>
            <label>Name</label>
            <input
              className='form-input'
              type="text"
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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

          <div className='wraped'>
            <label>User Role</label>
            <select
              name="role"
              className="form-input"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>

        </form>

      </div>
    </div>
  );
};

export default SignUp;
