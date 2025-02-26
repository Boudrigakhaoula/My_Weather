import React from 'react';

const LocationButton = ({ onLocation }) => {
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        onLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  return (
    <button onClick={handleLocation}>Utiliser ma localisation</button>
  );
};

export default LocationButton;