import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-info text-dark mb-4 py-3 display-flex align-center">
      {/* <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Tech Friends
        </h1>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Meet your new programming pals.
        </p>
      </div> */}
      <Link to="/">Search</Link>
      <Link to="/login">Login</Link>
      <Link to="/saved">Saved</Link>
      {/* <a href='/'>home</a> */}
    </nav>
  );
};

export default Nav;