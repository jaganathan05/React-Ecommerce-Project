import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {Authactions} from '../../../Store/Slices/UserAuth'
import CartItems from '../Pages/Cart';
import { Cartactions } from '../../../Store/Slices/Cart';
function Header() {
  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    localStorage.removeItem('token')
    dispatch(Cartactions.logout())
dispatch(Authactions.logout())


  }

 

  const isLoggedin = useSelector(state=> state.Auth.isLoggedin)
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/Logo.png" alt="Logo"  />
        </Link>
      </div>
      
     <CartItems/>
      {
        !isLoggedin && <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      } 
      {
       isLoggedin && <Button className='btn-danger' onClick={logoutHandler}>Logout</Button>
      }
      
    </header>
  );
}

export default Header;
