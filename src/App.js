// We import useState and useEffect in our component
import React, { useState, useEffect } from 'react';
import PlaceList from './components/PlaceList';

function App() {
  // We declare a state variable that is an array called `issues` and a function to update it.
  const [places, setPlaces] = useState([]);

  // When the page loads, we invoke our getRepoIssues method and pass in 'facebook/react' as the repo name
  // This only runs once because of our empty dependency array.
  useEffect(() => {
    getPlaces();
  }, []);

  // Helper function that preforms an API request and sets the `issues` array to a list of issues from GitHub
  const getPlaces = () => {
    setPlaces(['Vegas', 'Istanbul', 'Venice']);
  };

  return (
    <div className="container">
      <h2 className="header">GitHub issues for 'facebook/react'</h2>
      <span className="text-primary">
        Stored in state variable <code>issues</code>
      </span>
      <hr></hr>
      <div className="ui grid">
        <div className="row">
          <div className="col-11">
            <PlaceList places={places} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
