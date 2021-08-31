import React from 'react';

// Issue item accepts a single issue as a prop
// This component is responsible for displaying the specific information for a given issue



const Place = ({ place }) => {

  const handleSave = () => {
    
  }

  return (
    <div className="card mb-3" style={{ border: 'none' }}>
      <div
        className="card-header bg-info text-light p-2 m-0"
        style={{ color: 'white', borderRadius: '5px' }}
      >
        <h3>{place.cityName}</h3>
        <pre><span>Region: </span>{place.region}</pre>
        <pre><span>Population: </span>{place.population}</pre>
        <pre><span>Longitude: </span>{place.longitude}</pre>
        <pre><span>Latitude: </span>{place.latitude}</pre>
        <button onClick={handleSave}>Save</button>
        
      </div>
    </div>
  );
};

export default Place;
