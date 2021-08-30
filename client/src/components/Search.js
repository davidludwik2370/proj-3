// We import useState and useEffect in our component
import React, { useState, useEffect } from 'react';
import PlaceList from './PlaceList';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

function Search() {
  // We declare a state variable that is an array called `issues` and a function to update it.
  const [places, setPlaces] = useState([]);
  const [formState, setFormState] = useState({
    numCities: 0,
    sort: '-population',
    countries: '',
    offset: 0,
    
  });

  // Helper function that preforms an API request and sets the `issues` array to a list of issues from GitHub
  const getPlaces = () => {
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${formState.numCities}&sort=${formState.sort}${formState.countries}&minPopulation=1&offset=${formState.offset}`, {
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
        cities.push({
          cityName: cityList[i].city,
          region: cityList[i].region,
          population: cityList[i].population,
          longitude: cityList[i].longitude,
          latitude: cityList[i].latitude,
        });
      }

    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value);
    if(name==='numCities'){
      setFormState({
        ...formState,
        numCities: value,
      });
    }
    if(name==='country'){
      if(name.length > 0){
        setFormState({
          ...formState,
          countries: `&countryIds=${value}`,
        });
      }
      else{
        setFormState({
          ...formState,
          countries: ``,
        });
      }
      
    }
    if(name==='offset'){

      fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${formState.numCities}&sort=${formState.sort}${formState.countries}&minPopulation=1&offset=0`, {
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
        let newOffset = res.metadata.totalCount;
        console.log(newOffset);
        if(value==='low'){
          newOffset = Math.round(newOffset*0.6666);
          return newOffset;
        }
        if(value === 'med'){
          newOffset = Math.round(newOffset*0.3333);
          return newOffset;
        }
        if(value === 'high'){
          newOffset = 0;
          return newOffset;
        }
        // console.log(newOffset);
        
        // console.log(formState.offset);
      }).then(res => {
        console.log('res',res);
        setFormState({
          ...formState,
          offset: res,
        });
        console.log('offsett ',formState.offset)
      })
      .catch(err => {
        console.error(err);
      });



      
    }
    
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
                  placeholder="Country"
                  name="country"
                  type="text"
                //   value={formState.numCities}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Number of Cities"
                  name="numCities"
                  type="text"
                //   value={formState.numCities}
                  onChange={handleChange}
                />

                <label for="offset">Population Level:  </label>

                <select name="offset" id="offset" onChange={handleChange}>
                  <option value="high">High</option>
                  <option value="med">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>





        <div className="container">
        <h2 className="header">Possible Destinations</h2>
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
