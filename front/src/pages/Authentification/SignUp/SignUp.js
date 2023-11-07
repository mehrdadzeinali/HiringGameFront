import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post(API_ENDPOINTS.auth.register, {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-up-page">
    <div className="sign-up-container">
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>You have already an account? <a href="/auth/login">Sign in</a></p>
      </div>
    </div>
  );
}

export default SignUpPage;
