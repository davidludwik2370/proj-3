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

  // React.useEffect(() => {
  //   fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  //     "x-rapidapi-key": "9610a05b5amshd976184d69c9411p1b38bdjsn299a5e3639b6"
  //   }
  // })
  // .then(response => {
  //   return response.json();
  // })
  // .then(res => {
  //   console.log(res.data);
  //   let cityList = res.data;
  //   for(let i=0; i<cityList.length; i++){
  //     setPlaces([...places, cityList[i].city]);
  //     console.log(cityList[i].city);
  //   }
  //   console.log(places);
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  // },[]);

  // Helper function that preforms an API request and sets the `issues` array to a list of issues from GitHub
  const getPlaces = () => {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "9610a05b5amshd976184d69c9411p1b38bdjsn299a5e3639b6"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(res => {
      console.log(res.data);
      let cityList = res.data;
      let cities = [];
      for(let i=0; i<cityList.length+1; i++){
        if(i===cityList.length){
          setPlaces(cities);
          return;
        }
        // setPlaces([...places, cityList[i].city]);
        cities.push(cityList[i].city);
        // console.log(cityList[i].city);
      }
      // console.log(places);
      // return
    })
    .catch(err => {
      console.error(err);
    });
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
