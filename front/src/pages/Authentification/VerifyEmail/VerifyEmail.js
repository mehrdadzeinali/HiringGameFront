import React, { useState, useEffect } from 'react';
import './VerifyEmail.css';
import { useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';

function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const showErrorToast = (description) => {
    toast({
      title: "Error",
      description: description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left"
    });
  };

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      showErrorToast("Please enter the 6-digit verification code.");
      return;
    }

    if (!email) {
      showErrorToast("Email is not provided.");
      return;
    }

    try {

      const params = {
        email,
        verificationCode
      };

      const response = await axios.post(API_ENDPOINTS.auth.veifyEmail, params);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });

        navigate('/');

      } else {
        toast({
          title: "Failed",
          description: response.data.message,
          status: "failed",
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while verifying your email.";
      showErrorToast(errorMessage);
      console.error('Error Details:', error.response);
    }
  };

  const handleReturn = () => {
    navigate('/auth/signup');
  };

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <h1>Verify Your Email</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="verification-code">Verification Code:</label>
          <input
            type="text"
            id="verification-code"
            maxLength="6"
            value={verificationCode}
            onChange={handleInputChange}
            className="verify-email-code-input"
            autoComplete="off"
            autoFocus
          />
          <button className="verify-email-button" type="submit">Verify</button>
        </form>
        <button className="verify-email-button" type="button" onClick={handleReturn}>Return</button>
      </div>
    </div>
  );  
}

export default VerifyEmailPage;
