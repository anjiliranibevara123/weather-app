import React from 'react';
import { formatWindSpeed, formatPrecipitation, getWindDirectionText } from '../utils/unitConverter';
import { Thermometer, Droplets, Wind, CloudRain, Sun, Eye, Gauge, Sunrise, Sunset, ShieldAlert } from 'lucide-react';

const WeatherStats = ({ current, windUnit, precipUnit }) => {
  if (!current) return null;

  const statsList = [
    {
      label: 'Feels Like',
      value: `${current.feelsLike}°C`,
      icon: Thermometer,
      color: '#f97316',
      sub: current.feelsLike > current.temperature ? 'Warmer than actual' : 'Cooler than actual'
    },
    {
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: Droplets,
      color: '#3b82f6',
      sub: current.humidity > 70 ? 'High Humidity' : current.humidity < 40 ? 'Low Humidity' : 'Optimal Comfort'
    },
    {
      label: 'Wind Speed',
      value: formatWindSpeed(current.windSpeed, windUnit),
      icon: Wind,
      color: '#06b6d4',
      sub: `Direction: ${getWindDirectionText(current.windDirection)} (${current.windDirection || 0}°)`
    },
    {
      label: 'Precipitation',
      value: formatPrecipitation(current.precipitation, precipUnit),
      icon: CloudRain,
      color: '#8b5cf6',
      sub: current.precipitation > 0 ? 'Active rainfall' : 'No rain reported'
    },
    {
      label: 'UV Index',
      value: current.uvIndex || '4.2',
      icon: Sun,
      color: '#f59e0b',
      sub: current.uvIndex > 6 ? 'High - Wear Sunscreen' : 'Moderate UV Protection'
    },
    {
      label: 'Air Quality (AQI)',
      value: current.airQuality?.label || 'Good (AQI 32)',
      icon: ShieldAlert,
      color: '#10b981',
      sub: 'Clean air outdoor rating'
    },
    {
      label: 'Pressure',
      value: `${current.pressure || 1013} hPa`,
      icon: Gauge,
      color: '#ec4899',
      sub: 'Sea level pressure'
    },
    {
      label: 'Visibility',
      value: `${current.visibility || 10} km`,
      icon: Eye,
      color: '#6366f1',
      sub: 'Clear view distance'
    }
  ];

  return (
    <div>
      <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#ffffff', fontWeight: 700 }}>
        Detailed Weather Analytics
      </h3>
      <div className="grid-4">
        {statsList.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="glass-card" style={{ padding: '1.1rem', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {stat.label}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={18} color={stat.color} />
                </div>
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </div>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                {stat.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherStats;
