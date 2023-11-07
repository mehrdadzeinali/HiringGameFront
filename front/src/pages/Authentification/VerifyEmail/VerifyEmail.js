import React, { useState } from 'react';
import './VerifyEmail.css';
import axios from 'axios';
import API_ENDPOINTS from '../../../configs/urls';

function VerifyEmailPage() {
  // Initialize an array state to hold the six input values
  const [codeDigits, setCodeDigits] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');

  const handleInputChange = (index) => (e) => {
    const newCodeDigits = [...codeDigits]; // Copy the current code digits array
    newCodeDigits[index] = e.target.value; // Update the value at the specific index
    setCodeDigits(newCodeDigits); // Set the new code digits array

    // Automatically focus the next input field if the value is filled
    if (e.target.value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = codeDigits.join(''); // Join the code digits to form the full code
    if (code.length !== 6) {
      setError("Please fill in all the digits.");
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.auth.verifyEmail, { code });
      // Handle the response accordingly
    } catch (error) {
      setError("An error occurred while verifying your email.");
      console.error(error);
    }
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Verify Email</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
