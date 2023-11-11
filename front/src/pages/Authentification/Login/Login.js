import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';
import { useToast } from '@chakra-ui/react';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const toast = useToast();
  const navigate = useNavigate();  

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

      console.log(response);
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
  
        toast({
          title: "Login Successful",
          description: "You are now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });

        navigate('/');
      }
    }
    catch (error) {
      toast({
        title: "Login Failed",
        description: error.response.data.message || "An error occurred while trying to log in.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      console.error('Error: ', error);
    }
  };

  return (
    <div className="login-page-bg">
      <div className="login-ctn">
        <h1>Welcome !</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-ctn">
            <label htmlFor="username">Mail :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-ctn">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="login-button">Sign in</button>
        </form>
        <p>You don't have an account? <a href="/auth/signup">Sign up</a></p>
      </div>
    </div>
  ); 
}

export default LoginPage;
