const { fetchWeatherData } = require('../services/openWeatherService');
const SearchHistory = require('../models/SearchHistory');
const FavoriteCity = require('../models/FavoriteCity');
const { getDBStatus } = require('../config/db');
const { ApiError } = require('../middleware/errorMiddleware');

// In-memory fallback stores if MongoDB is not connected
const memoryHistory = [];
const memoryFavorites = [];

// GET /api/weather?city=London OR ?lat=...&lon=...
const getWeather = async (req, res, next) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      throw new ApiError(400, 'City parameter or lat/lon coordinates are required');
    }

    if (city !== undefined && city.trim() === '') {
      throw new ApiError(400, 'Search query cannot be empty');
    }

    const weatherData = await fetchWeatherData(city, lat ? parseFloat(lat) : null, lon ? parseFloat(lon) : null);

    // Save to Search History in MongoDB if connected, else memory
    try {
      if (getDBStatus()) {
        await SearchHistory.create({
          city: weatherData.location.city,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
          temperature: weatherData.current.temperature,
          condition: weatherData.current.condition,
          icon: weatherData.current.icon,
          searchedAt: new Date()
        });
      } else {
        memoryHistory.unshift({
          _id: Date.now().toString(),
          city: weatherData.location.city,
          country: weatherData.location.country,
          temperature: weatherData.current.temperature,
          condition: weatherData.current.condition,
          icon: weatherData.current.icon,
          searchedAt: new Date()
        });
        if (memoryHistory.length > 20) memoryHistory.pop();
      }
    } catch (dbErr) {
      console.warn(`[SearchHistory DB Error] ${dbErr.message}`);
    }

    res.status(200).json({
      status: 'success',
      data: weatherData
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/history
const getSearchHistory = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const history = await SearchHistory.find().sort({ searchedAt: -1 }).limit(10);
      return res.status(200).json({ status: 'success', count: history.length, data: history });
    } else {
      return res.status(200).json({ status: 'success', count: memoryHistory.length, data: memoryHistory.slice(0, 10) });
    }
  } catch (err) {
    next(err);
  }
};

// GET /api/favorites
const getFavorites = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const favorites = await FavoriteCity.find().sort({ createdAt: -1 });
      return res.status(200).json({ status: 'success', count: favorites.length, data: favorites });
    } else {
      return res.status(200).json({ status: 'success', count: memoryFavorites.length, data: memoryFavorites });
    }
  } catch (err) {
    next(err);
  }
};

// POST /api/favorites
const addFavorite = async (req, res, next) => {
  try {
    const { city, country, lat, lon } = req.body;
    if (!city) throw new ApiError(400, 'City is required to add favorite');

    if (getDBStatus()) {
      const fav = await FavoriteCity.findOneAndUpdate(
        { city: city.trim() },
        { city: city.trim(), country: country || '', lat: lat || 0, lon: lon || 0 },
        { upsert: true, new: true }
      );
      return res.status(201).json({ status: 'success', data: fav });
    } else {
      const existingIdx = memoryFavorites.findIndex(f => f.city.toLowerCase() === city.toLowerCase());
      const item = { _id: Date.now().toString(), city: city.trim(), country: country || '', lat: lat || 0, lon: lon || 0 };
      if (existingIdx >= 0) memoryFavorites[existingIdx] = item;
      else memoryFavorites.push(item);
      return res.status(201).json({ status: 'success', data: item });
    }
  } catch (err) {
    next(err);
  }
};

// DELETE /api/favorites/:city
const deleteFavorite = async (req, res, next) => {
  try {
    const { city } = req.params;
    if (!city) throw new ApiError(400, 'City param required');

    if (getDBStatus()) {
      await FavoriteCity.deleteOne({ city: new RegExp(`^${city}$`, 'i') });
    } else {
      const idx = memoryFavorites.findIndex(f => f.city.toLowerCase() === city.toLowerCase());
      if (idx >= 0) memoryFavorites.splice(idx, 1);
    }

    res.status(200).json({ status: 'success', message: `Removed ${city} from favorites` });
  } catch (err) {
    next(err);
  }
};

// GET /api/health
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'online',
    appName: 'Weather Now MERN API',
    uptime: process.uptime(),
    database: getDBStatus() ? 'Connected (MongoDB)' : 'Hybrid In-Memory Fallback',
    openWeatherKeyConfigured: !!(process.env.OPENWEATHER_API_KEY && process.env.OPENWEATHER_API_KEY !== 'your_openweather_api_key_here'),
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getWeather,
  getSearchHistory,
  getFavorites,
  addFavorite,
  deleteFavorite,
  getHealth
};
