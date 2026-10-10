import React from 'react';
import { formatTemperature } from '../utils/unitConverter';
import { Bookmark, MapPin, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

const CurrentWeather = ({ weather, tempUnit, isFavorite, onToggleFavorite }) => {
  if (!weather || !weather.current) return null;

  const { location, current } = weather;

  // OpenWeather Animated Icon URL Generator
  const getWeatherIconUrl = (iconCode) => {
    if (!iconCode) return 'https://openweathermap.org/img/wn/01d@4x.png';
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <div
      className="glass-card animate-fade"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.45) 0%, rgba(15, 23, 42, 0.75) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem'
      }}
    >
      {/* Background Ambient Glow Accent */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-10%',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
        
        {/* Left Side: Location, Temp & Description */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <MapPin size={20} color="#60a5fa" />
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
              {location.city}, <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{location.country}</span>
            </h2>
            <button
              onClick={onToggleFavorite}
              title={isFavorite ? "Remove from Favorites (MongoDB)" : "Save to Favorites (MongoDB)"}
              style={{
                background: isFavorite ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${isFavorite ? '#f59e0b' : 'var(--border-light)'}`,
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '0.5rem',
                transition: 'var(--transition-fast)'
              }}
            >
              <Bookmark size={17} color={isFavorite ? '#f59e0b' : 'var(--text-muted)'} fill={isFavorite ? '#f59e0b' : 'none'} />
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} color="#f59e0b" />
            {current.description || current.condition}
          </p>

          {/* Temperature Hero Display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', margin: '1.25rem 0' }}>
            <span style={{
              fontSize: '4.5rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1,
              background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {formatTemperature(current.temperature, tempUnit)}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Feels like <strong style={{ color: '#ffffff' }}>{formatTemperature(current.feelsLike, tempUnit)}</strong>
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                  <ArrowUp size={14} /> {formatTemperature(current.high, tempUnit)}
                </span>
                <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                  <ArrowDown size={14} /> {formatTemperature(current.low, tempUnit)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Weather Icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={getWeatherIconUrl(current.icon)}
            alt={current.condition}
            className="animate-float"
            style={{ width: '130px', height: '130px', filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))' }}
          />
          <span style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#93c5fd',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginTop: '-0.5rem'
          }}>
            {current.condition}
          </span>
        </div>

      </div>
    </div>
  );
};

export default CurrentWeather;
