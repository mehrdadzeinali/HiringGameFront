import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Ensure this path is correct
import logo2 from '../../assets/images/logo2.png'; // Adjust the path as needed

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
  
    window.addEventListener('authChange', handleAuthChange);

    handleAuthChange();
  
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
    window.dispatchEvent(new Event('authChange')); // Dispatch the event on logout
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo2} alt="App Logo" />
      </Link>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <>
            <button type="button" className="auth-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="auth-button">Login</Link>
            <Link to="/auth/signup" className="auth-button">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
