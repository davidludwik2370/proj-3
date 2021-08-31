import React, { useState, useEffect } from 'react';
import PlaceList from './PlaceList';


function Search() {
  const [places, setPlaces] = useState([]);
  const [formState, setFormState] = useState({
    numCities: 3,
    sort: '-population',
    countries: '',
    offset: 0,
  });

  // fetching city data from api
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
          cityId: cityList[i].id,
        });
      }

    })
    .catch(err => {
      console.error(err);
    });
  };

  //updating form state
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
      //must prefetch data to measure number of results so that offsets can be calculated
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
        let medOffset = Math.round(newOffset*0.6666);
        let lowOffset = Math.round(newOffset*0.3333);
        console.log(newOffset);
        //randomness injected into offsets to offer uniqe cities for every result
        if(value==='low'){       
          return Math.round(Math.random() * (lowOffset -1 - medOffset) + medOffset);
        }
        if(value === 'med'){
          return Math.round(Math.random() * (lowOffset - medOffset) + medOffset);
        }
        if(value === 'high'){
          return Math.round(Math.random() * (medOffset-1));
        }
        
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
    let destinations = document.querySelector('.destinations')
    destinations.setAttribute("style", "display: block");
    destinations.setAttribute("style", "margin-top: 25px");
    destinations.setAttribute("style", "color: white");
    
    getPlaces();
  }

  return (
    <div style={{width:'35%', margin:'30px'}}>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Country"
            name="country"
            type="text"
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Number of Cities"
            name="numCities"
            type="text"
            onChange={handleChange}
          />

          <label for="offset" style={{color:'white'}}>Population Level:  </label>

          <select name="offset" id="offset" onChange={handleChange} style={{width:"85px"}}>
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
        <h1 className="header" >
          <span className="destinations" style={{display:"none", color:'white'}}>Possible Destinations</span>
          </h1>
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
