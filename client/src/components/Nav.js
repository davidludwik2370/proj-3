import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-info text-dark mb-4 py-3 display-flex " style={{display:'flex', justifyContent: "space-around"}}>
      
      <div><Link to="/">Search</Link></div>
      <div><Link to="/saved">Saved</Link></div>
      <div><Link to="/signup">Signup</Link></div>
      <div><Link to="/login">Login</Link></div>
      

    </nav>
  );
};

export default Nav;
