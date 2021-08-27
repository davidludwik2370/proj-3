// We import useState and useEffect in our component
import React, { useState, useEffect } from 'react';
import PlaceList from './PlaceList';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

function Search() {
  // We declare a state variable that is an array called `issues` and a function to update it.
  const [places, setPlaces] = useState([]);
  const [formState, setFormState] = useState({
    numCities: 0,
  });

//   useEffect(() => {
//     getPlaces();
//   }, []);

  // Helper function that preforms an API request and sets the `issues` array to a list of issues from GitHub
  const getPlaces = () => {
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${formState.numCities}`, {
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
        cities.push(cityList[i].city);
      }

    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setFormState({
      ...formState,
      numCities: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    getPlaces();
  }

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="numCities"
                  type="text"
                //   value={formState.numCities}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>





        <div className="container">
        <h2 className="header">GitHub issues for 'facebook/react'</h2>
        <span className="text-primary">
            Stored in state variable <code>issues</code>
        </span>
        <hr></hr>
        <div className="ui grid">
            <div className="row">
            <div className="col-11">
                <PlaceList places={places}/>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Search;
