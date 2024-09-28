import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Authactions } from '../../../Store/Slices/UserAuth';

function Header() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    
    dispatch(Authactions.logout());
  };

  // Check if the user is logged in
  const isLoggedin = useSelector(state => state.AdminAuth.isLoggedin);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>
      
      

      {/* Conditional rendering based on login status */}
      {!isLoggedin ? (
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <Button className='btn-danger' onClick={logoutHandler}>Logout</Button>
      )}
    </header>
  );
}

export default Header;
