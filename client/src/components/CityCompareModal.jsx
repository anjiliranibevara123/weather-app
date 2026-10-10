import React, { useState } from 'react';
import { Columns, X, Search, ArrowRightLeft } from 'lucide-react';
import { weatherService } from '../services/weatherService';
import { formatTemperature, formatWindSpeed } from '../utils/unitConverter';

const CityCompareModal = ({ isOpen, onClose, currentCityData, tempUnit, windUnit }) => {
  const [targetCity, setTargetCity] = useState('');
  const [comparedData, setComparedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCompareSearch = async (e) => {
    e.preventDefault();
    if (!targetCity.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await weatherService.getWeatherByCity(targetCity.trim());
      setComparedData(data);
    } catch (err) {
      setError(err.message || 'City not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card animate-fade" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid var(--border-glow)',
        background: '#0f172a'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ArrowRightLeft size={22} color="#3b82f6" />
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff', fontWeight: 800 }}>
              Dual-City Weather Comparison
            </h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Target City Input */}
        <form onSubmit={handleCompareSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={targetCity}
            onChange={(e) => setTargetCity(e.target.value)}
            placeholder="Enter second city to compare (e.g., Tokyo, Paris)..."
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Search size={16} /> {loading ? 'Fetching...' : 'Compare'}
          </button>
        </form>

        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}

        {/* Comparison Grid */}
        <div className="grid-2">
          {/* City 1 (Current) */}
          <div style={{ background: 'rgba(30, 58, 138, 0.25)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <h4 style={{ color: '#93c5fd', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Primary City
            </h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.35rem 0' }}>
              {currentCityData.location.city}, {currentCityData.location.country}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>
              {formatTemperature(currentCityData.current.temperature, tempUnit)}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
              {currentCityData.current.condition} ({currentCityData.current.description})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
              <div>Feels Like: <strong>{formatTemperature(currentCityData.current.feelsLike, tempUnit)}</strong></div>
              <div>Humidity: <strong>{currentCityData.current.humidity}%</strong></div>
              <div>Wind: <strong>{formatWindSpeed(currentCityData.current.windSpeed, windUnit)}</strong></div>
              <div>Pressure: <strong>{currentCityData.current.pressure} hPa</strong></div>
            </div>
          </div>

          {/* City 2 (Compared) */}
          {comparedData ? (
            <div style={{ background: 'rgba(249, 115, 22, 0.15)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
              <h4 style={{ color: '#fdba74', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Comparison City
              </h4>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.35rem 0' }}>
                {comparedData.location.city}, {comparedData.location.country}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>
                {formatTemperature(comparedData.current.temperature, tempUnit)}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                {comparedData.current.condition} ({comparedData.current.description})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                <div>Feels Like: <strong>{formatTemperature(comparedData.current.feelsLike, tempUnit)}</strong></div>
                <div>Humidity: <strong>{comparedData.current.humidity}%</strong></div>
                <div>Wind: <strong>{formatWindSpeed(comparedData.current.windSpeed, windUnit)}</strong></div>
                <div>Pressure: <strong>{comparedData.current.pressure} hPa</strong></div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Type a city name above to view side-by-side comparison analytics.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CityCompareModal;
