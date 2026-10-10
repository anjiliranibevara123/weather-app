import React from 'react';
import { CloudOff, AlertTriangle, Search, RefreshCw, Compass } from 'lucide-react';

export const LoadingState = () => (
  <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: '3px solid rgba(59, 130, 246, 0.2)',
      borderTopColor: 'var(--accent-blue-500)',
      animation: 'spinSlow 1s linear infinite',
      marginBottom: '1.25rem'
    }} />
    <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 700 }}>
      Fetching Live Weather Matrix...
    </h3>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
      Connecting through Express REST backend to OpenWeather API
    </p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="glass-card animate-fade" style={{ padding: '3rem 2rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'rgba(239, 68, 68, 0.15)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    }}>
      <AlertTriangle size={28} color="#ef4444" />
    </div>
    <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.5rem' }}>
      Unable to Retrieve Weather Data
    </h3>
    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
      {message || 'An error occurred while communicating with the weather backend service.'}
    </p>
    <button className="btn btn-primary" onClick={onRetry}>
      <RefreshCw size={16} /> Try Searching Again
    </button>
  </div>
);

export const NoResultsState = ({ city, onReset }) => (
  <div className="glass-card animate-fade" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'rgba(245, 158, 11, 0.15)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    }}>
      <CloudOff size={28} color="#f59e0b" />
    </div>
    <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.5rem' }}>
      No City Found matching "{city}"
    </h3>
    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
      Please check the spelling or try searching for a major capital city like London, Tokyo, or New York.
    </p>
    <button className="btn btn-secondary" onClick={onReset}>
      <Search size={16} /> Clear Search
    </button>
  </div>
);

export const EmptyState = ({ onPopularClick }) => (
  <div className="glass-card animate-fade" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <div style={{
      width: '64px',
      height: '64px',
      borderRadius: '20px',
      background: 'var(--grad-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.25rem',
      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)'
    }}>
      <Compass size={32} color="#ffffff" />
    </div>
    <h2 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.5rem' }}>
      How's the Sky Looking Today?
    </h2>
    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 1.75rem' }}>
      Search for any city worldwide, or pick one of the popular global destinations below to explore real-time weather analytics.
    </p>

    <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {['London', 'Tokyo', 'New York', 'Paris', 'Dubai', 'Sydney'].map((city) => (
        <button
          key={city}
          className="btn btn-secondary"
          onClick={() => onPopularClick(city)}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          {city}
        </button>
      ))}
    </div>
  </div>
);
