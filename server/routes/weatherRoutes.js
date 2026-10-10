const express = require('express');
const router = express.Router();
const {
  getWeather,
  getSearchHistory,
  getFavorites,
  addFavorite,
  deleteFavorite,
  getHealth
} = require('../controllers/weatherController');

// Route definitions per PDF specifications & guidelines
router.get('/weather', getWeather);
router.get('/history', getSearchHistory);
router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:city', deleteFavorite);
router.get('/health', getHealth);

module.exports = router;
