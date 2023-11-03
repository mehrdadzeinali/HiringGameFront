import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(API_ENDPOINTS.auth.login, {
        email: formData.username,
        password: formData.password,
      });
  
      if (response.data.status === 'success') {
        console.log("Successfully logged in!");
      } else {
        console.log("Invalid email or password");
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page-bg">
      <div className="login-ctn">
        <h1>Welcome !</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Mail :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="Signin-button">Sign in</button>
        </form>
        <p>You don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  ); 
}

export default LoginPage;
