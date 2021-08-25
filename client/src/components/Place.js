import React from 'react';

// Issue item accepts a single issue as a prop
// This component is responsible for displaying the specific information for a given issue



const Place = ({ place }) => {

  

  return (
    <div className="card mb-3" style={{ border: 'none' }}>
      <div
        className="card-header bg-info text-light p-2 m-0"
        style={{ color: 'white', borderRadius: '5px' }}
      >
        <p>
          {place}
        </p>
        
      </div>
    </div>
  );
};

export default Place;
