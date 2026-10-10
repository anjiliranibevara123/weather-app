import React from 'react';
import { formatTemperature } from '../utils/unitConverter';
import { Umbrella, Calendar } from 'lucide-react';

const DailyForecast = ({ daily = [], selectedDayIndex, onSelectDay, tempUnit }) => {
  if (!daily || daily.length === 0) return null;

  // Find min and max temp across 7 days for range bar calculation
  const overallMin = Math.min(...daily.map(d => d.tempMin));
  const overallMax = Math.max(...daily.map(d => d.tempMax));

  const getIconUrl = (code) => `https://openweathermap.org/img/wn/${code || '01d'}.png`;

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} color="#60a5fa" /> 7-Day Forecast
        </h3>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Click a day to view detailed hourly timeline
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {daily.map((day, idx) => {
          const isSelected = idx === selectedDayIndex;
          
          // Temperature Bar Range Percentage
          const rangeSpan = Math.max(1, overallMax - overallMin);
          const leftPercent = ((day.tempMin - overallMin) / rangeSpan) * 100;
          const widthPercent = Math.max(12, ((day.tempMax - day.tempMin) / rangeSpan) * 100);

          return (
            <div
              key={idx}
              onClick={() => onSelectDay(idx)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 2.5fr 1fr',
                alignItems: 'center',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(59, 130, 246, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1px solid var(--accent-blue-500)' : '1px solid rgba(255, 255, 255, 0.05)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                gap: '0.75rem'
              }}
              onMouseOver={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
              }}
              onMouseOut={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              {/* Day Label */}
              <div>
                <span style={{ fontWeight: isSelected ? 800 : 700, color: isSelected ? '#ffffff' : 'var(--text-main)', fontSize: '0.95rem' }}>
                  {day.dayName}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                  {day.fullDate}
                </span>
              </div>

              {/* Icon & Condition */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <img src={getIconUrl(day.icon)} alt={day.condition} style={{ width: '38px', height: '38px' }} />
                <span className="hide-mobile" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {day.condition}
                </span>
              </div>

              {/* Rain Chance % */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#60a5fa' }}>
                {day.precipitationProb > 0 ? (
                  <>
                    <Umbrella size={13} />
                    <span>{day.precipitationProb}%</span>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-dim)' }}>0%</span>
                )}
              </div>

              {/* Visual Temperature Range Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', width: '38px', textAlign: 'right' }}>
                  {formatTemperature(day.tempMin, tempUnit)}
                </span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6 0%, #f97316 100%)',
                    borderRadius: '999px'
                  }} />
                </div>
                <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, width: '38px' }}>
                  {formatTemperature(day.tempMax, tempUnit)}
                </span>
              </div>

              {/* Selection Status Badge */}
              <div style={{ textAlign: 'right' }}>
                {isSelected ? (
                  <span style={{ fontSize: '0.7rem', background: 'var(--accent-blue-500)', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                    Selected
                  </span>
                ) : (
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>View →</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
