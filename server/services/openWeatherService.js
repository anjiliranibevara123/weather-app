const axios = require('axios');

// Realistic Mock Generator for Demo / Backup mode
const generateMockWeatherData = (cityName, requestedLat, requestedLon) => {
  const cityLower = (cityName || 'London').trim();
  const formattedCity = cityLower.charAt(0).toUpperCase() + cityLower.slice(1);
  
  const mockLocations = {
    'London': { country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lon: -0.1278, baseTemp: 16, condition: 'Clouds', desc: 'Overcast clouds', icon: '04d' },
    'Tokyo': { country: 'Japan', countryCode: 'JP', lat: 35.6762, lon: 139.6503, baseTemp: 22, condition: 'Clear', desc: 'Sunny sky', icon: '01d' },
    'New york': { country: 'United States', countryCode: 'US', lat: 40.7128, lon: -74.0060, baseTemp: 19, condition: 'Rain', desc: 'Light rain showers', icon: '10d' },
    'Paris': { country: 'France', countryCode: 'FR', lat: 48.8566, lon: 2.3522, baseTemp: 18, condition: 'Clear', desc: 'Clear sky', icon: '01d' },
    'Berlin': { country: 'Germany', countryCode: 'DE', lat: 52.5200, lon: 13.4050, baseTemp: 15, condition: 'Clouds', desc: 'Scattered clouds', icon: '03d' },
    'Sydney': { country: 'Australia', countryCode: 'AU', lat: -33.8688, lon: 151.2093, baseTemp: 24, condition: 'Clear', desc: 'Sunny and clear', icon: '01d' },
    'Mumbai': { country: 'India', countryCode: 'IN', lat: 19.0760, lon: 72.8777, baseTemp: 31, condition: 'Haze', desc: 'Humid haze', icon: '50d' },
    'Dubai': { country: 'United Arab Emirates', countryCode: 'AE', lat: 25.2048, lon: 55.2708, baseTemp: 36, condition: 'Clear', desc: 'Hot sunshine', icon: '01d' }
  };

  const loc = mockLocations[formattedCity] || {
    country: 'International',
    countryCode: 'INT',
    lat: requestedLat || 51.5074,
    lon: requestedLon || -0.1278,
    baseTemp: 20 + Math.floor(Math.sin(formattedCity.length) * 8),
    condition: formattedCity.length % 2 === 0 ? 'Clear' : 'Clouds',
    desc: formattedCity.length % 2 === 0 ? 'Clear blue skies' : 'Scattered fluffy clouds',
    icon: formattedCity.length % 2 === 0 ? '01d' : '03d'
  };

  const days = ['Today', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayOfWeek = today.getDay();

  const dailyForecasts = [];
  const conditionList = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Clear', 'Clouds'];
  const iconList = ['01d', '03d', '10d', '09d', '11d', '01d', '02d'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = d.toISOString().split('T')[0];
    const cIdx = (i + formattedCity.length) % conditionList.length;

    // Generate 24-hour forecasts for each day
    const hourly = [];
    for (let h = 0; h < 24; h += 3) {
      const tempVar = Math.sin((h - 6) / 12 * Math.PI) * 4;
      hourly.push({
        time: `${h.toString().padStart(2, '0')}:00`,
        hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
        temp: Math.round(loc.baseTemp + tempVar + (i % 3) - 1),
        feelsLike: Math.round(loc.baseTemp + tempVar + (i % 3) - 2),
        humidity: Math.min(95, Math.max(30, 60 + Math.floor(Math.cos(h) * 15))),
        windSpeed: Math.max(4, 12 + Math.floor(Math.sin(h + i) * 6)),
        precipitation: cIdx === 2 || cIdx === 3 || cIdx === 4 ? parseFloat((Math.random() * 3.5).toFixed(1)) : 0,
        condition: conditionList[cIdx],
        icon: iconList[cIdx],
        pop: cIdx === 2 ? 85 : cIdx === 3 ? 60 : cIdx === 4 ? 95 : 10
      });
    }

    const dayHigh = Math.max(...hourly.map(h => h.temp)) + 2;
    const dayLow = Math.min(...hourly.map(h => h.temp)) - 2;

    dailyForecasts.push({
      date: dateStr,
      dayName,
      fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      condition: conditionList[cIdx],
      icon: iconList[cIdx],
      tempMax: dayHigh,
      tempMin: dayLow,
      precipitation: hourly[0].precipitation,
      precipitationProb: hourly[0].pop,
      humidity: hourly[0].humidity,
      windSpeed: hourly[0].windSpeed,
      hourly
    });
  }

  const currentHourData = dailyForecasts[0].hourly[2];

  return {
    isMock: true,
    location: {
      city: formattedCity,
      country: loc.country,
      countryCode: loc.countryCode,
      lat: loc.lat,
      lon: loc.lon
    },
    current: {
      temperature: loc.baseTemp,
      feelsLike: loc.baseTemp - 2,
      humidity: 58,
      windSpeed: 14, // km/h
      windDirection: 210, // S-SW
      precipitation: 0.2, // mm
      condition: loc.condition,
      description: loc.desc,
      icon: loc.icon,
      high: dailyForecasts[0].tempMax,
      low: dailyForecasts[0].tempMin,
      uvIndex: loc.condition === 'Clear' ? 6.8 : 3.2,
      airQuality: loc.condition === 'Clear' ? { index: 1, label: 'Good (AQI 28)' } : { index: 2, label: 'Fair (AQI 54)' },
      pressure: 1014, // hPa
      visibility: 10, // km
      sunrise: '06:14 AM',
      sunset: '07:42 PM'
    },
    daily: dailyForecasts,
    hourly: dailyForecasts[0].hourly
  };
};

// OpenWeather Map Live Fetcher & Transformer
const fetchWeatherData = async (city, lat, lon) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    console.log(`[OpenWeather Service] No valid API key set. Serving rich mock payload for demo.`);
    return generateMockWeatherData(city, lat, lon);
  }

  try {
    let targetLat = lat;
    let targetLon = lon;
    let cityName = city;
    let countryName = '';

    // Step 1: Geocoding if city passed
    if (city && (!lat || !lon)) {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
      const geoRes = await axios.get(geoUrl);
      if (!geoRes.data || geoRes.data.length === 0) {
        const error = new Error(`City '${city}' not found.`);
        error.statusCode = 404;
        throw error;
      }
      targetLat = geoRes.data[0].lat;
      targetLon = geoRes.data[0].lon;
      cityName = geoRes.data[0].name;
      countryName = geoRes.data[0].country;
    }

    // Step 2: Fetch Current Weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${targetLat}&lon=${targetLon}&units=metric&appid=${apiKey}`;
    const weatherRes = await axios.get(weatherUrl);
    const currData = weatherRes.data;

    // Step 3: Fetch 5-day / 3-hour Forecast Data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${targetLat}&lon=${targetLon}&units=metric&appid=${apiKey}`;
    const forecastRes = await axios.get(forecastUrl);
    const forecastData = forecastRes.data;

    cityName = currData.name || cityName || 'Unknown City';
    countryName = currData.sys?.country || countryName || '';

    // Transform Forecast into Daily & Hourly
    const dailyMap = {};
    forecastData.list.forEach(item => {
      const dt = new Date(item.dt * 1000);
      const dateKey = dt.toISOString().split('T')[0];
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = {
          date: dateKey,
          dayName: dt.toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          temps: [],
          conditions: [],
          icons: [],
          precipitations: [],
          hourly: []
        };
      }
      const hourItem = {
        time: dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        hourLabel: dt.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6), // m/s to km/h
        precipitation: item.rain ? item.rain['3h'] || 0 : item.snow ? item.snow['3h'] || 0 : 0,
        condition: item.weather[0]?.main || 'Clear',
        icon: item.weather[0]?.icon || '01d',
        pop: Math.round((item.pop || 0) * 100)
      };

      dailyMap[dateKey].temps.push(item.main.temp);
      dailyMap[dateKey].conditions.push(item.weather[0]?.main);
      dailyMap[dateKey].icons.push(item.weather[0]?.icon);
      dailyMap[dateKey].precipitations.push(hourItem.precipitation);
      dailyMap[dateKey].hourly.push(hourItem);
    });

    const dailyList = Object.values(dailyMap).slice(0, 7).map(d => ({
      date: d.date,
      dayName: d.dayName,
      fullDate: d.fullDate,
      condition: d.conditions[Math.floor(d.conditions.length / 2)] || 'Clear',
      icon: d.icons[Math.floor(d.icons.length / 2)] || '01d',
      tempMax: Math.round(Math.max(...d.temps)),
      tempMin: Math.round(Math.min(...d.temps)),
      precipitation: parseFloat((d.precipitations.reduce((a, b) => a + b, 0)).toFixed(1)),
      precipitationProb: Math.round(Math.max(...d.hourly.map(h => h.pop))),
      humidity: d.hourly[0]?.humidity || 50,
      windSpeed: d.hourly[0]?.windSpeed || 10,
      hourly: d.hourly
    }));

    return {
      isMock: false,
      location: {
        city: cityName,
        country: countryName,
        countryCode: countryName,
        lat: targetLat,
        lon: targetLon
      },
      current: {
        temperature: Math.round(currData.main.temp),
        feelsLike: Math.round(currData.main.feels_like),
        humidity: currData.main.humidity,
        windSpeed: Math.round(currData.wind.speed * 3.6), // km/h
        windDirection: currData.wind.deg || 0,
        precipitation: currData.rain ? currData.rain['1h'] || 0 : 0,
        condition: currData.weather[0]?.main || 'Clear',
        description: currData.weather[0]?.description || '',
        icon: currData.weather[0]?.icon || '01d',
        high: dailyList[0]?.tempMax || Math.round(currData.main.temp_max),
        low: dailyList[0]?.tempMin || Math.round(currData.main.temp_min),
        uvIndex: 5.5,
        airQuality: { index: 1, label: 'Good (AQI 32)' },
        pressure: currData.main.pressure,
        visibility: Math.round(currData.visibility / 1000), // km
        sunrise: new Date(currData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(currData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      },
      daily: dailyList,
      hourly: dailyList[0]?.hourly || []
    };
  } catch (error) {
    if (error.statusCode === 404) throw error;
    console.warn(`[OpenWeather API Error] ${error.message}. Fallback to mock payload.`);
    return generateMockWeatherData(city, lat, lon);
  }
};

module.exports = {
  fetchWeatherData
};
