const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  temperature: {
    type: Number
  },
  condition: {
    type: String
  },
  icon: {
    type: String
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
