import React, { useState } from 'react';
import { Search, Navigation, History, Sparkles } from 'lucide-react';

const SearchBar = ({ onSearch, onGeolocation, recentSearches = [], isLoading }) => {
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Please enter a city name');
      return;
    }
    setErrorMsg('');
    onSearch(query.trim());
  };

  const handleRecentClick = (cityName) => {
    setQuery(cityName);
    setErrorMsg('');
    onSearch(cityName);
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="Search for a city (e.g. London, Tokyo, New York)..."
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 2.75rem',
              borderRadius: 'var(--radius-md)',
              border: errorMsg ? '1px solid #ef4444' : '1px solid var(--border-light)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'var(--transition-fast)'
            }}
          />
        </div>

        {/* Submit Search Button */}
        <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ minWidth: '110px' }}>
          <Search size={16} />
          {isLoading ? 'Searching...' : 'Search'}
        </button>

        {/* Geolocation Button */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onGeolocation}
          disabled={isLoading}
          title="Use browser Geolocation API to auto-detect current location"
        >
          <Navigation size={16} color="#38bdf8" />
          <span>My Location</span>
        </button>
      </form>

      {/* Validation Error Banner */}
      {errorMsg && (
        <p style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '0.5rem', marginLeft: '0.25rem', fontWeight: 500 }}>
          {errorMsg}
        </p>
      )}

      {/* Recent Searches Quick Badges per PDF specs */}
      {recentSearches.length > 0 && (
        <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
            <History size={13} /> Recent Searches:
          </span>
          {recentSearches.slice(0, 6).map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRecentClick(item.city)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                fontSize: '0.78rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue-500)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
            >
              <span>{item.city}</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>({item.country})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
