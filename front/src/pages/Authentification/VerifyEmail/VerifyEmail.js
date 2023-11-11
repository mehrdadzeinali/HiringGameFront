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

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(60);  

  useEffect(() => {
    let interval;
  
    if (isButtonDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      setTimer(60);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isButtonDisabled, timer]);

  const handleResendCode = async () => {
    setIsButtonDisabled(true);
    setTimer(60);
    try {
      const response = await axios.post(API_ENDPOINTS.auth.resendVerificationMail, { email });

      console.log(response);

      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    } catch (error) {
      showErrorToast("Failed to resend verification code.");
      console.error('Error Details:', error.response);
    }
  };  

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
          <div className="button-group">
            <button className="verify-email-button" type="submit">Verify</button>
            <button className="verify-email-button" type="button" onClick={handleReturn}>Return</button>
            <button
              className="verify-email-button resend-button"
              type="button"
              disabled={isButtonDisabled}
              onClick={handleResendCode}
            >
              {isButtonDisabled ? `Resend code in ${timer}s` : "Resend Code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
}

export default VerifyEmailPage;
