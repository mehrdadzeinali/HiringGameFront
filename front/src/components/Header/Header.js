import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo2 from '../../assets/images/logo2.png'

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo2} alt="HirinGame Logo" />
            </Link>

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
