import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    // You can replace this with a more complex state management
    // like Redux or Context API to track user authentication status.
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <header className="header">
            <Link to="/" className="logo">HirinGame</Link>
            {isAuthenticated ? (
                <div className="profile">
                    <img src="/path-to-profile-icon.png" alt="Profile Icon" />
                </div>
            ) : (
                <div className="auth-buttons">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </header>
    );
}

export default Header;
