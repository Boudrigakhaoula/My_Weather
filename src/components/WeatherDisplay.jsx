import React from 'react';
import styles from '../styles/WeatherDisplay.module.css';
import { 
  WiHumidity, 
  WiStrongWind, 
  WiBarometer, 
  WiThermometer,
  WiRaindrop,
  WiCloudyWindy,
  WiSunrise,
  WiSunset
} from 'react-icons/wi';
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
      case 'overcast clouds':
      case 'broken clouds':
        return cloudyImage;
      case 'scattered clouds':
      case 'few clouds':
        return partlycloudyImage;
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'drizzle':
        return rainyImage;
      case 'snow':
      case 'light snow':
        return snowyImage;
      case 'thunderstorm':
        return stormyImage;
      case 'clear':
      case 'clear sky':
        return sunnyImage;
      default:
        return sunnyImage;
    }
  };

  const getDayName = (date, isToday = false) => {
    if (isToday) return "Aujourd'hui";
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[new Date(date * 1000).getDay()];
  };

  // Créer un tableau avec la météo actuelle et les prévisions
  const allForecasts = [
    {
      dt: Date.now() / 1000,
      main: {
        temp_max: weather.main.temp,
        temp_min: weather.main.temp,
        humidity: weather.main.humidity
      },
      weather: weather.weather,
      wind: weather.wind,
      isToday: true
    },
    ...forecast.list.reduce((acc, curr) => {
      const date = new Date(curr.dt * 1000).toLocaleDateString();
      if (!acc.find(item => new Date(item.dt * 1000).toLocaleDateString() === date)) {
        acc.push(curr);
      }
      return acc;
    }, []).slice(0, 4) // Prendre les 4 prochains jours
  ];

  // Convertir les timestamps en heures locales
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Calculer la température ressentie
  const feelsLike = Math.round(weather.main.feels_like);

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.mainInfo}>
        <h2 className={styles.cityName}>
          {weather.name}, {weather.sys.country}
        </h2>
        <div className={styles.currentTemp}>
          <WiThermometer className={styles.tempIcon} />
          <span className={styles.tempValue}>{Math.round(weather.main.temp)}°C</span>
        </div>
        <p className={styles.feelsLike}>Ressenti {feelsLike}°C</p>
        <p className={styles.description}>{weather.weather[0].description}</p>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailCard}>
          <WiHumidity className={styles.detailIcon} />
          <div className={styles.detailInfo}>
            <h3>Humidité</h3>
            <p>{weather.main.humidity}%</p>
            <span className={styles.detailDesc}>
              {weather.main.humidity > 60 ? 'Humidité élevée' : 'Humidité normale'}
            </span>
          </div>
        </div>

        <div className={styles.detailCard}>
          <WiStrongWind className={styles.detailIcon} />
          <div className={styles.detailInfo}>
            <h3>Vent</h3>
            <p>{Math.round(weather.wind.speed * 3.6)} km/h</p>
            <span className={styles.detailDesc}>
              Direction: {weather.wind.deg}°
            </span>
          </div>
        </div>

        <div className={`${styles.detailCard} ${styles.visibilityCard}`}>
          <WiCloudyWindy className={styles.detailIcon} />
          <div className={styles.detailInfo}>
            <h3>Visibilité</h3>
            <p>{(weather.visibility / 1000).toFixed(1)} km</p>
            <span className={styles.detailDesc}>
              {weather.visibility > 5000 ? 'Bonne visibilité' : 'Visibilité réduite'}
            </span>
          </div>
        </div>

        <div className={styles.detailCard}>
          <WiBarometer className={styles.detailIcon} />
          <div className={styles.detailInfo}>
            <h3>Pression</h3>
            <p>{weather.main.pressure} hPa</p>
            <span className={styles.detailDesc}>
              {weather.main.pressure > 1013 ? 'Haute pression' : 'Basse pression'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.sunTimes}>
        <div className={styles.sunTime}>
          <WiSunrise className={styles.sunIcon} />
          <div>
            <h3>Lever du soleil</h3>
            <p>{sunrise}</p>
          </div>
        </div>
        <div className={styles.sunTime}>
          <WiSunset className={styles.sunIcon} />
          <div>
            <h3>Coucher du soleil</h3>
            <p>{sunset}</p>
          </div>
        </div>
      </div>

      <div className={styles.forecastSection}>
        <h2 className={styles.forecastTitle}>Prévisions sur 5 jours</h2>
        <div className={styles.forecastRow}>
          {allForecasts.map((day, index) => (
            <div key={index} className={styles.forecastCard}>
              <h3>{getDayName(day.dt, day.isToday)}</h3>
              <img 
                src={getWeatherIcon(day.weather[0].description)} 
                alt={day.weather[0].description}
                className={styles.weatherIcon}
              />
              <div className={styles.forecastTemp}>
                <p className={styles.maxTemp}>{Math.round(day.main.temp_max)}°</p>
                <p className={styles.minTemp}>{Math.round(day.main.temp_min)}°</p>
              </div>
              <p className={styles.forecastDesc}>{day.weather[0].description}</p>
              <div className={styles.forecastDetails}>
                <span>
                  <WiHumidity className={styles.smallIcon} />
                  {day.main.humidity}%
                </span>
                <span>
                  <WiStrongWind className={styles.smallIcon} />
                  {Math.round(day.wind.speed * 3.6)} km/h
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;