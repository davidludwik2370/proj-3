// We import useState and useEffect in our component
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import React, { useState, useEffect } from 'react';
import PlaceList from './components/PlaceList';
import Saved from './components/Saved';
import Search from './components/Search';
// import Login from './components/Login';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav/>
        <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route exact path="/saved">
          <Saved />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
