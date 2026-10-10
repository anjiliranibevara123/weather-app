import React from 'react';
import { CloudSun, Volume2, VolumeX, Cpu, Columns, Bookmark } from 'lucide-react';
import { soundEngine } from '../utils/audioAmbience';

const Header = ({
  tempUnit,
  setTempUnit,
  windUnit,
  setWindUnit,
  precipUnit,
  setPrecipUnit,
  activeSound,
  setActiveSound,
  onOpenInspector,
  onOpenCompare,
  onOpenFavorites,
  favoriteCount = 0
}) => {
  const handleSoundToggle = () => {
    const nextState = soundEngine.toggle('rain');
    setActiveSound(nextState);
  };

  return (
    <header className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
          }}>
            <CloudSun size={26} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, background: 'linear-gradient(90deg, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Weather Now
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Full-Stack MERN Edition
            </p>
          </div>
        </div>

        {/* Right Header Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Unit Selectors as per PDF specification */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Temp Unit Toggle */}
            <div className="unit-toggle-group" title="Temperature Unit">
              <button
                className={`unit-btn ${tempUnit === 'C' ? 'active' : ''}`}
                onClick={() => setTempUnit('C')}
              >
                °C
              </button>
              <button
                className={`unit-btn ${tempUnit === 'F' ? 'active' : ''}`}
                onClick={() => setTempUnit('F')}
              >
                °F
              </button>
            </div>

            {/* Wind Unit Toggle */}
            <div className="unit-toggle-group" title="Wind Speed Unit">
              <button
                className={`unit-btn ${windUnit === 'km/h' ? 'active' : ''}`}
                onClick={() => setWindUnit('km/h')}
              >
                km/h
              </button>
              <button
                className={`unit-btn ${windUnit === 'mph' ? 'active' : ''}`}
                onClick={() => setWindUnit('mph')}
              >
                mph
              </button>
            </div>

            {/* Precipitation Unit Toggle */}
            <div className="unit-toggle-group" title="Precipitation Unit">
              <button
                className={`unit-btn ${precipUnit === 'mm' ? 'active' : ''}`}
                onClick={() => setPrecipUnit('mm')}
              >
                mm
              </button>
              <button
                className={`unit-btn ${precipUnit === 'in' ? 'active' : ''}`}
                onClick={() => setPrecipUnit('in')}
              >
                in
              </button>
            </div>
          </div>

          {/* Quick Features Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* Web Audio Ambience Toggle */}
            <button
              className={`btn-icon ${activeSound !== 'off' ? 'active' : ''}`}
              onClick={handleSoundToggle}
              title="Toggle Weather Audio Ambience (Web Audio API)"
              style={{
                borderColor: activeSound !== 'off' ? 'var(--accent-blue-500)' : 'var(--border-light)',
                background: activeSound !== 'off' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'
              }}
            >
              {activeSound !== 'off' ? <Volume2 size={18} color="#60a5fa" /> : <VolumeX size={18} color="var(--text-muted)" />}
            </button>

            {/* Compare Cities Drawer Toggle */}
            <button
              className="btn btn-secondary"
              onClick={onOpenCompare}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              title="Compare side-by-side weather for 2 cities"
            >
              <Columns size={16} />
              <span className="hide-mobile">Compare</span>
            </button>

            {/* Favorites Drawer Toggle */}
            <button
              className="btn btn-secondary"
              onClick={onOpenFavorites}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', position: 'relative' }}
              title="View MongoDB Saved Favorite Cities"
            >
              <Bookmark size={16} color="#f59e0b" />
              <span className="hide-mobile">Favorites</span>
              {favoriteCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#f97316',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  borderRadius: '999px',
                  padding: '2px 6px'
                }}>
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Architecture Inspector for Internship Assessor */}
            <button
              className="btn btn-primary"
              onClick={onOpenInspector}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              title="Open Internship Architecture Inspector"
            >
              <Cpu size={16} />
              <span className="hide-mobile">MERN Inspector</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;
