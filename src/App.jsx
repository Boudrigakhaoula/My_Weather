import React, { useState } from 'react';
import { 
  getWeatherByCity, 
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords 
} from './services/WeatherService';
import Home from './components/Home';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await getWeatherByCity(city);
      const forecastData = await getForecastByCity(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError('Erreur lors de la recherche de la ville. Veuillez réessayer.');
      console.error('Erreur de recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = async () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Promisifier getCurrentPosition
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude: lat, longitude: lon } = position.coords;

      // Récupérer les données météo avec les coordonnées
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      let errorMessage = 'Erreur lors de la récupération de votre position.';
      
      // Gérer les différents types d'erreurs de géolocalisation
      if (error.code === 1) {
        errorMessage = 'Accès à la localisation refusé. Veuillez autoriser l\'accès à votre position.';
      } else if (error.code === 2) {
        errorMessage = 'Position non disponible. Veuillez réessayer.';
      } else if (error.code === 3) {
        errorMessage = 'Délai d\'attente dépassé. Veuillez réessayer.';
      }

      setError(errorMessage);
      console.error('Erreur de géolocalisation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Home 
      weather={weather}
      forecast={forecast}
      onSearch={handleSearch}
      onLocation={handleLocation}
      error={error}
      loading={loading}
    />
  );
};

export default App;