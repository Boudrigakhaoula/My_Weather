import React from 'react';

const Forecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div>
      <h3>Prévisions sur 5 jours</h3>
      {forecast.list.map((item, index) => (
        <div key={index}>
          <p>Date: {item.dt_txt}</p>
          <p>Température: {item.main.temp}°C</p>
          <p>Conditions: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;