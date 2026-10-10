import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherStats from './components/WeatherStats';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import SmartAdvisor from './components/SmartAdvisor';
import SkyCanvas from './components/SkyCanvas';
import CityCompareModal from './components/CityCompareModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import ArchitectureInspector from './components/ArchitectureInspector';
import { LoadingState, ErrorState, NoResultsState, EmptyState } from './components/States';
import { weatherService } from './services/weatherService';

function App() {
  // State management for Units (per PDF specification)
  const [tempUnit, setTempUnit] = useState('C');
  const [windUnit, setWindUnit] = useState('km/h');
  const [precipUnit, setPrecipUnit] = useState('mm');

  // Weather Data State
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [noResultsCity, setNoResultsCity] = useState(null);

  // Soundscape Ambience State
  const [activeSound, setActiveSound] = useState('off');

  // Backend Sync State
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Drawers & Modals
  const [showInspector, setShowInspector] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load initial search history and default city on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    fetchHistoryAndFavorites();
    handleCitySearch('London');
  };

  const fetchHistoryAndFavorites = async () => {
    const history = await weatherService.getSearchHistory();
    const favs = await weatherService.getFavorites();
    setRecentSearches(history);
    setFavorites(favs);
  };

  // Main City Search Handler
  const handleCitySearch = async (cityName) => {
    if (!cityName) return;
    setIsLoading(true);
    setErrorMsg(null);
    setNoResultsCity(null);
    setSelectedDayIndex(0);

    try {
      const data = await weatherService.getWeatherByCity(cityName);
      setWeatherData(data);
      fetchHistoryAndFavorites();
    } catch (err) {
      if (err.message && err.message.includes('404') || err.message.includes('not found')) {
        setNoResultsCity(cityName);
      } else {
        setErrorMsg(err.message || 'Error connecting to weather backend API');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Browser Geolocation Handler
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setNoResultsCity(null);
    setSelectedDayIndex(0);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await weatherService.getWeatherByCoords(latitude, longitude);
          setWeatherData(data);
          fetchHistoryAndFavorites();
        } catch (err) {
          setErrorMsg('Failed to fetch weather for your location.');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        setErrorMsg('Unable to retrieve your location. Please check browser permissions.');
      }
    );
  };

  // Toggle MongoDB Favorite City
  const handleToggleFavorite = async () => {
    if (!weatherData || !weatherData.location) return;
    const city = weatherData.location.city;
    const isFav = favorites.some((f) => f.city.toLowerCase() === city.toLowerCase());

    try {
      if (isFav) {
        await weatherService.removeFavorite(city);
      } else {
        await weatherService.addFavorite({
          city: weatherData.location.city,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon
        });
      }
      fetchHistoryAndFavorites();
    } catch (err) {
      console.warn('Favorite toggle error:', err);
    }
  };

  const isCurrentFavorite = weatherData?.location
    ? favorites.some((f) => f.city.toLowerCase() === weatherData.location.city.toLowerCase())
    : false;

  const currentCondition = weatherData?.current?.condition || 'Clear';

  return (
    <div className="app-container">
      {/* Dynamic Ambient Sky Canvas */}
      <SkyCanvas condition={currentCondition} />

      {/* Main Header with Unit Selectors & Actions */}
      <Header
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        windUnit={windUnit}
        setWindUnit={setWindUnit}
        precipUnit={precipUnit}
        setPrecipUnit={setPrecipUnit}
        activeSound={activeSound}
        setActiveSound={setActiveSound}
        onOpenInspector={() => setShowInspector(true)}
        onOpenCompare={() => setShowCompare(true)}
        onOpenFavorites={() => setShowFavorites(true)}
        favoriteCount={favorites.length}
      />

      {/* City Search Bar & Recent History Badges */}
      <SearchBar
        onSearch={handleCitySearch}
        onGeolocation={handleGeolocation}
        recentSearches={recentSearches}
        isLoading={isLoading}
      />

      {/* Main Content Area depending on state */}
      {isLoading ? (
        <LoadingState />
      ) : errorMsg ? (
        <ErrorState message={errorMsg} onRetry={() => handleCitySearch('London')} />
      ) : noResultsCity ? (
        <NoResultsState city={noResultsCity} onReset={() => handleCitySearch('London')} />
      ) : weatherData ? (
        <>
          {/* Hero Current Weather */}
          <CurrentWeather
            weather={weatherData}
            tempUnit={tempUnit}
            isFavorite={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* AI Lifestyle & Outfit Advisor (Unique Feature) */}
          <SmartAdvisor
            current={weatherData.current}
            location={weatherData.location}
          />

          {/* 7-Day Forecast & Hourly Timeline Row */}
          <div className="grid-2">
            <DailyForecast
              daily={weatherData.daily}
              selectedDayIndex={selectedDayIndex}
              onSelectDay={setSelectedDayIndex}
              tempUnit={tempUnit}
            />

            <HourlyForecast
              daily={weatherData.daily}
              selectedDayIndex={selectedDayIndex}
              onSelectDay={setSelectedDayIndex}
              tempUnit={tempUnit}
              windUnit={windUnit}
            />
          </div>

          {/* Detailed Analytics Grid */}
          <WeatherStats
            current={weatherData.current}
            windUnit={windUnit}
            precipUnit={precipUnit}
          />
        </>
      ) : (
        <EmptyState onPopularClick={handleCitySearch} />
      )}

      {/* Dual City Comparison Modal */}
      {weatherData && (
        <CityCompareModal
          isOpen={showCompare}
          onClose={() => setShowCompare(false)}
          currentCityData={weatherData}
          tempUnit={tempUnit}
          windUnit={windUnit}
        />
      )}

      {/* MongoDB Favorites Drawer */}
      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onSelectCity={handleCitySearch}
        onRemoveFavorite={async (city) => {
          await weatherService.removeFavorite(city);
          fetchHistoryAndFavorites();
        }}
      />

      {/* Internship Evaluator Panel & Architecture Inspector */}
      <ArchitectureInspector
        isOpen={showInspector}
        onClose={() => setShowInspector(false)}
        currentPayload={weatherData}
      />
    </div>
  );
}

export default App;
