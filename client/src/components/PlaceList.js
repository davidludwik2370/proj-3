import React from 'react';
import Place from './Place';

//accepts array of places
const PlaceList = ({ places }) => {
  console.log('IssueList -> issues', places);

  // create list of places
  const renderedList = places.map((place) => {
    return <Place key={place.cityName} place={place} />;
  });

  // return rendered array of places
  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default PlaceList;
