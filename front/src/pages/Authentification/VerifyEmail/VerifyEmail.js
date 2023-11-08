import React, { useState } from 'react';
import './VerifyEmail.css';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';

function VerifyEmailPage() {
  const [codeDigits, setCodeDigits] = useState(new Array(6).fill(''));
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (index) => (e) => {
    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = e.target.value;
    setCodeDigits(newCodeDigits);

    if (e.target.value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = codeDigits.join('');
    if (code.length !== 6) {
      showErrorToast("Please fill in all the digits.");
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.auth.verifyEmail, { code });
      // Handle the response if needed
    } catch (error) {
      showErrorToast("An error occurred while verifying your email.");
      console.error(error);
    }
  };

  const handleReturn = () => {
    navigate('/auth/register');
  };

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <h1>Verify Your Email</h1>
        <form onSubmit={handleSubmit}>
          <div className="verify-email-input-container">
            {codeDigits.map((digit, index) => (
              <input
                type="text"
                id={`digit-${index}`}
                maxLength="1"
                key={index}
                value={digit}
                onChange={handleInputChange(index)}
                className="verify-email-code-input"
                autoComplete="off"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button className="verify-email-button" type="submit">Verify Email</button>
          <button className="verify-email-button" type="button" onClick={handleReturn}>Return</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
