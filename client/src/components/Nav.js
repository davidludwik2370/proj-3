import React from 'react';
import { Link } from 'react-router-dom';

//navigation bar
const Nav = () => {
  return (
    <nav className="bg-info text-dark mb-4 py-3 display-flex " style={{display:'flex', justifyContent: "space-around"}}>
      
      <div><Link to="/" style={{color:'white'}}>Search</Link></div>
      <div><Link to="/saved" style={{color:'white'}}>Saved</Link></div>
      <div><Link to="/signup" style={{color:'white'}}>Signup</Link></div>
      <div><Link to="/login" style={{color:'white'}}>Login</Link></div>
      

    </nav>
  );
};

export default Nav;
