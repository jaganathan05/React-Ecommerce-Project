import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}

export default Header;
