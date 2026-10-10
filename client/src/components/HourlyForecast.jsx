import React from 'react';
import { formatTemperature, formatWindSpeed } from '../utils/unitConverter';
import { Clock, Wind, Droplets } from 'lucide-react';

const HourlyForecast = ({ daily = [], selectedDayIndex = 0, onSelectDay, tempUnit, windUnit }) => {
  if (!daily || daily.length === 0) return null;

  const currentDay = daily[selectedDayIndex] || daily[0];
  const hourlyData = currentDay.hourly || [];

  const getIconUrl = (code) => `https://openweathermap.org/img/wn/${code || '01d'}.png`;

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color="#06b6d4" />
          <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
            Hourly Forecast — <span style={{ color: '#60a5fa' }}>{currentDay.dayName} ({currentDay.fullDate})</span>
          </h3>
        </div>

        {/* Day Selector Tabs per PDF requirement */}
        <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '2px' }}>
          {daily.map((d, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDay(idx)}
              style={{
                background: idx === selectedDayIndex ? 'var(--accent-blue-500)' : 'rgba(255, 255, 255, 0.05)',
                color: idx === selectedDayIndex ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                whiteSpace: 'nowrap'
              }}
            >
              {d.dayName}
            </button>
          ))}
        </div>

      </div>

      {/* Hourly Timeline Cards Carousel Scroll */}
      <div style={{
        display: 'flex',
        gap: '0.85rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        scrollBehavior: 'smooth'
      }}>
        {hourlyData.map((hour, idx) => (
          <div
            key={idx}
            style={{
              flex: '0 0 115px',
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.4rem',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue-500)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {hour.hourLabel || hour.time}
            </span>

            <img src={getIconUrl(hour.icon)} alt={hour.condition} style={{ width: '42px', height: '42px' }} />

            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              {formatTemperature(hour.temp, tempUnit)}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#60a5fa' }}>
                <Droplets size={11} /> {hour.humidity}%
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Wind size={11} /> {formatWindSpeed(hour.windSpeed, windUnit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
