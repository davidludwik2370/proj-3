// We import useState and useEffect in our component
import React, { useState, useEffect } from 'react';
import PlaceList from './components/PlaceList';
import Saved from './components/Saved';
import Search from './components/Search';
import Login from './components/Login';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      
      <Router>
        <Nav/>
        <Route exact path="/">
          <Search />
        </Route>
        <Route exact path="/saved">
          <Saved />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
