import React, { useState, useEffect } from 'react';



const Saved = ({ place }) => {
  const [cityState, setCityState] = useState([]);

  //pull data from api on page load
  useEffect(() => {
    getSaved();
  });

  const handleDelete = () => {

  }

  const getSaved = async () => {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q1973", {
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
      const city = res.data;
      
      setCityState(...cityState, {
        name: city.name,
        country: city.country,
        population: city.population,
        timezone: city.timezone,
        latitude: city.latitude,
        longitude: city.longitude,
      });

    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <div className="card mb-3" style={{ border: 'none', width:'35%', marginLeft:'80px', marginTop:'40px' }}>
      <div
        className="card-header bg-info text-light p-2 m-0"
        style={{ color: 'white', borderRadius: '5px' }}
      >
        <h3>{cityState.name}</h3>
        <pre><span>Country: </span>{cityState.country}</pre>
        <pre><span>Population: </span>{cityState.population}</pre>
        <pre><span>Longitude: </span>{cityState.longitude}</pre>
        <pre><span>Latitude: </span>{cityState.latitude}</pre>
        <pre><span>Time Zone: </span>{cityState.timezone}</pre>
        <button onClick={handleDelete}>Delete</button>
        
      </div>
    </div>
  );
};

export default Saved;