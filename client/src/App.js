import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Saved from './components/Saved';
import Search from './components/Search';
// import Login from './components/Login';
import Nav from './components/Nav';

import Login from './components/LoginForm';
import Signup from './components/SignupForm';

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <div 
    // style={{ 
    //   backgroundImage: `url("https://s29843.pcdn.co/blog/wp-content/uploads/sites/2/2017/12/Pantone-color-picker-samples-855.jpg")` 
    // }}
    >
      <header><h1 style={{
        backgoundColor: 'red',
        color: 'green',
        }}>Globe Traveller</h1></header>
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
        <Route exact path="/signup">
          <Signup />
        </Route>
        </Switch>
      </Router>
    </ApolloProvider>
    </div>
  );
}

export default App;
