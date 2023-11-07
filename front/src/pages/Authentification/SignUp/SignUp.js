import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';
import { useToast } from '@chakra-ui/react';

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email.' };
    }
    return { valid: true, message: '' };
  };

  const isPasswordValid = (password) => {
    let errorMessage = '';

    if (password.length < 8 || password.length > 16) {
      errorMessage = 'Password must be 8-16 characters long.';
      return { valid: false, message: errorMessage };
    }

    const lowerCaseRegex = /[a-z]/;
    if (!lowerCaseRegex.test(password)) {
      errorMessage = 'Password must include at least one lowercase letter.';
      return { valid: false, message: errorMessage };
    }

    const upperCaseRegex = /[A-Z]/;
    if (!upperCaseRegex.test(password)) {
      errorMessage = 'Password must include at least one uppercase letter.';
      return { valid: false, message: errorMessage };
    }

    const digitRegex = /[0-9]/;
    if (!digitRegex.test(password)) {
      errorMessage = 'Password must include at least one digit.';
      return { valid: false, message: errorMessage };
    }

    const specialCharRegex = /[!@#\$%\^&\*]/;
    if (!specialCharRegex.test(password)) {
      errorMessage = 'Password must include at least one special character (!@#$%^&*).';
      return { valid: false, message: errorMessage };
    }

    const charCount = {};
    for (const char of password) {
      if (charCount[char]) {
        charCount[char]++;
        if (charCount[char] > 3) {
          errorMessage = 'Password must not have more than three identical characters in a row.';
          return { valid: false, message: errorMessage };
        }
      } else {
        charCount[char] = 1;
      }
    }

    return { valid: true, message: '' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "fields Error",
        description: "all fields are required",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }

    const emailValidation = isEmailValid(formData.email);
    if (!emailValidation.valid) {
      toast({
        title: "Email Error",
        description: emailValidation.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }

    const passwordValidation = isPasswordValid(formData.password);
    if (!passwordValidation.valid) {
      toast({
        title: "Password Error",
        description: passwordValidation.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.auth.register, {
        email: formData.email,
        password: formData.password,
        confirmation_password: formData.confirmPassword,
      });

      toast({
        title: "Account Created",
        description: "Your account has been successfully created. We sent you a code via mail. Please verify your mail.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });

      navigate('/auth/verify-email');

    } catch (error) {
      toast({
        title: "Registration Error",
        description: 'An error occurred while registering. Please try again.',
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      console.error(error);
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h1>Create your account</h1>
        <form onSubmit={handleSubmit}>
          <div className="sing-up-input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="sing-up-input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="sing-up-input-container">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="sign-up-button" type="submit">Sign Up</button>
        </form>
        <p>You have already an account? <Link to="/auth/login">Sign in</Link></p>
      </div>
    </div>
  );
}

export default SignUpPage;
