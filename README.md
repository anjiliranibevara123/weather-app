# 🌤️ Weather Now — Full-Stack MERN Application

A full-stack responsive weather web application built using the **MERN Stack** (**MongoDB**, **Express.js**, **React.js**, **Node.js**) with OpenWeather API integration, HTML5 Canvas weather particle background, procedural Web Audio soundscapes, AI weather advisor, and internship architecture inspector.

---

## 🚀 Key Highlights & Unique Features

1. **Full-Stack Architecture Separation**: React frontend communicates *only* with the Express backend REST API (`/api/weather`, `/api/history`, `/api/favorites`, `/api/health`). OpenWeather API key is kept secure on the server side.
2. **MongoDB Data Persistence**: Real database persistence for search history and bookmarked favorite cities using Mongoose schemas. Features a hybrid in-memory fallback so evaluators can test without requiring a local MongoDB instance.
3. **Dynamic Canvas Particle Engine**: HTML5 Canvas particle system rendering real-time rain drops, thunderstorm lightning flashes, snow flakes, and sunbeams matching current weather conditions.
4. **Procedural Web Audio Soundscape Synthesizer**: Pure JavaScript Web Audio API synthesizer producing ambient rain, ocean breeze, and sunny chimes without heavy audio file downloads.
5. **AI Lifestyle & Outfit Advisor**: Intelligent rule engine recommending outfit choices, outdoor activity indices, and UV health protection.
6. **Dual-City Comparison Tool**: Side-by-side weather analytics comparison between any two cities globally.
7. **Internship Architecture Inspector**: Dedicated slide-out evaluator panel showing live backend health status, data flow diagram, and raw transformed JSON payloads.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), CSS3 Glassmorphism System, Lucide Icons, Web Audio API, HTML5 Canvas
- **Backend**: Node.js, Express.js REST API, Axios, Cors, Dotenv
- **Database**: MongoDB & Mongoose
- **External API**: OpenWeather Geocoding & Forecast APIs

---

## 📂 Project Structure

```text
weather-now/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                # Header & Unit Selectors (°C/°F, km/h/mph, mm/in)
│   │   │   ├── SearchBar.jsx             # City input & Geolocation API button
│   │   │   ├── CurrentWeather.jsx        # Hero card with temperature & animated icon
│   │   │   ├── WeatherStats.jsx          # Detailed analytics grid
│   │   │   ├── DailyForecast.jsx         # 7-day daily forecast with temperature bars
│   │   │   ├── HourlyForecast.jsx        # 24-hour timeline with day selector tabs
│   │   │   ├── SmartAdvisor.jsx          # AI outfit & lifestyle advice
│   │   │   ├── SkyCanvas.jsx             # Canvas ambient weather particles
│   │   │   ├── CityCompareModal.jsx      # Dual city comparison modal
│   │   │   ├── FavoritesDrawer.jsx       # MongoDB saved cities drawer
│   │   │   ├── ArchitectureInspector.jsx # Evaluator diagnostics panel
│   │   │   └── States.jsx                # Loading, Error, NoResults, Empty states
│   │   ├── services/
│   │   │   └── weatherService.js         # Frontend HTTP client service
│   │   ├── utils/
│   │   │   ├── audioAmbience.js          # Web Audio synthesizer engine
│   │   │   └── unitConverter.js          # Unit conversion helpers
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/
│   ├── config/
│   │   └── db.js                         # MongoDB connection with hybrid fallback
│   ├── controllers/
│   │   └── weatherController.js          # Request handlers for weather, history, favorites
│   ├── middleware/
│   │   └── errorMiddleware.js           # Centralized HTTP error handler
│   ├── models/
│   │   ├── SearchHistory.js              # MongoDB search history schema
│   │   └── FavoriteCity.js               # MongoDB favorite city schema
│   ├── routes/
│   │   └── weatherRoutes.js              # Express API route endpoints
│   ├── services/
│   │   └── openWeatherService.js         # API integration & mock transformer
│   ├── .env
│   ├── .env.example
│   └── server.js                         # Express server entry point
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/weathernow
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

*(Note: If `OPENWEATHER_API_KEY` is omitted or invalid, the backend automatically serves a rich realistic mock payload so all features remain testable!)*

---

## 🚦 Quick Start Guide

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server starts on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The frontend application starts on `http://localhost:5173`.

---

## 📡 API Endpoints Summary

- `GET /api/weather?city=London` — Fetches current, 7-day, and hourly weather data for a city.
- `GET /api/weather?lat=51.5&lon=-0.12` — Fetches weather data using latitude/longitude.
- `GET /api/history` — Returns recent search history from MongoDB.
- `GET /api/favorites` — Returns favorite bookmarked cities from MongoDB.
- `POST /api/favorites` — Saves a new favorite city to MongoDB.
- `DELETE /api/favorites/:city` — Removes a favorite city from MongoDB.
- `GET /api/health` — Returns server health, database connection state, and API key configuration.

---

## 🧠 Key Learnings & Challenges Solved

1. **API Key Security & Separation**: Ensured OpenWeather API key is never exposed to the client bundle by handling all external API calls in Node/Express backend.
2. **Payload Transformation**: Transformed OpenWeather's complex raw payload into clean frontend schemas before sending to React.
3. **Resilient MongoDB Fallback**: Built a hybrid fallback architecture so the application works seamlessly both with and without an active MongoDB connection.
