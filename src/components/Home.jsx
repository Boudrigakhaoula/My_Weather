import React from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import LocationButton from './LocationButton';
import styles from '../styles/Home.module.css';
import backgroundImage from '../assets/weather_background.jpg';
import cloudyImage from '../assets/Cloudy.png';
import partlycloudyImage from '../assets/PartlyCloudy.png';
import rainyImage from '../assets/Rainy.png';
import snowyImage from '../assets/Snowy.png';
import stormyImage from '../assets/Stormy.png';
import sunnyImage from '../assets/Sunny.png';

const Home = ({ weather, forecast, onSearch, onLocation, error, loading }) => {
  const getWeatherBackground = () => {
    if (!weather) return backgroundImage;
    
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
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
        return backgroundImage;
    }
  };

  return (
    <div 
      className={styles.container} 
      style={{ 
        backgroundImage: `url(${getWeatherBackground()})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      <div className={styles.content}>
        <h1>Application Météo en Temps Réel</h1>
        {error && <div className={styles.error}>{error}</div>}
        {loading && <div className={styles.loading}>Chargement...</div>}
        <div className={styles.searchContainer}>
          <SearchBar onSearch={onSearch} /><br />
          <LocationButton onLocation={onLocation} disabled={loading} />
        </div>
        <div className={styles.weatherInfo}>
          <WeatherDisplay weather={weather} forecast={forecast} />
        </div>
      </div>
    </div>
  );
};

export default Home;
