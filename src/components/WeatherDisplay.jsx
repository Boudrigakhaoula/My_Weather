import React from 'react';
import styles from '../styles/WeatherDisplay.module.css';
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from 'react-icons/wi';
import cloudyImage from '../assets/Cloudy.png';
import partlycloudyImage from '../assets/PartlyCloudy.png';
import rainyImage from '../assets/Rainy.png';
import snowyImage from '../assets/Snowy.png';
import stormyImage from '../assets/Stormy.png';
import sunnyImage from '../assets/Sunny.png';

const WeatherDisplay = ({ weather, forecast }) => {
  if (!weather || !forecast) return null;

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clouds':
        return cloudyImage;
      case 'partly cloudy':
        return partlycloudyImage;
      case 'rain':
      case 'drizzle':
        return rainyImage;
      case 'snow':
        return snowyImage;
      case 'thunderstorm':
        return stormyImage;
      case 'clear':
        return sunnyImage;
      default:
        return sunnyImage;
    }
  };

  const getDayName = (date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[new Date(date * 1000).getDay()];
  };

  const dailyForecasts = forecast.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = curr;
    }
    return acc;
  }, {});

  const fiveDaysForecast = Object.values(dailyForecasts).slice(0, 5);

  return (
    <div className={styles.weatherContainer}>
      <h2 className={styles.cityName}>
        <i className="fas fa-map-marker-alt"></i> {weather.name}
      </h2>
      <div className={styles.forecastContainer}>
        <div className={styles.dayCard}>
          <h3>Aujourd'hui</h3>
          <img 
            src={getWeatherIcon(weather.weather[0].main)} 
            alt={weather.weather[0].description}
            className={styles.weatherIcon}
          />
          <div className={styles.tempContainer}>
            <p className={styles.temp}>
              <WiThermometer className={styles.icon} />
              {Math.round(weather.main.temp)}°C
            </p>
            <p className={styles.description}>
              {weather.weather[0].description}
            </p>
          </div>
          <div className={styles.details}>
            <p>
              <WiHumidity className={styles.icon} />
              Humidité: {weather.main.humidity}%
            </p>
            <p>
              <WiStrongWind className={styles.icon} />
              Vent: {Math.round(weather.wind.speed)} km/h
            </p>
            <p>
              <WiBarometer className={styles.icon} />
              Pression: {weather.main.pressure} hPa
            </p>
          </div>
        </div>

        {fiveDaysForecast.slice(1).map((day, index) => (
          <div key={index} className={styles.dayCard}>
            <h3>{getDayName(day.dt)}</h3>
            <img 
              src={getWeatherIcon(day.weather[0].main)} 
              alt={day.weather[0].description}
              className={styles.weatherIcon}
            />
            <div className={styles.tempContainer}>
              <p className={styles.temp}>
                <WiThermometer className={styles.icon} />
                {Math.round(day.main.temp)}°C
              </p>
              <p className={styles.description}>
                {day.weather[0].description}
              </p>
            </div>
            <div className={styles.details}>
              <p>
                <WiHumidity className={styles.icon} />
                Humidité: {day.main.humidity}%
              </p>
              <p>
                <WiStrongWind className={styles.icon} />
                Vent: {Math.round(day.wind.speed)} km/h
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;