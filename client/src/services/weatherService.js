// Weather API Client Service
// Connects React Frontend to Express Node Backend (/api/*)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const weatherService = {
  // Fetch Weather Data by City
  getWeatherByCity: async (city) => {
    const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }
    return data.data;
  },

  // Fetch Weather Data by Geolocation Coordinates
  getWeatherByCoords: async (lat, lon) => {
    const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data for location');
    }
    return data.data;
  },

  // Get MongoDB Search History
  getSearchHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      const data = await response.json();
      return data.data || [];
    } catch (e) {
      console.warn('History fetch error:', e);
      return [];
    }
  },

  // Get MongoDB Favorite Cities
  getFavorites: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites`);
      const data = await response.json();
      return data.data || [];
    } catch (e) {
      console.warn('Favorites fetch error:', e);
      return [];
    }
  },

  // Add Favorite City to MongoDB
  addFavorite: async (cityData) => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cityData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to save favorite');
    return data.data;
  },

  // Remove Favorite City from MongoDB
  removeFavorite: async (city) => {
    const response = await fetch(`${API_BASE_URL}/favorites/${encodeURIComponent(city)}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete favorite');
    return data;
  },

  // Backend Health Check
  getHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  }
};
