import React, { useState, useEffect } from 'react';
import { Cpu, X, Server, Database, Code, CheckCircle, RefreshCw } from 'lucide-react';
import { weatherService } from '../services/weatherService';

const ArchitectureInspector = ({ isOpen, onClose, currentPayload }) => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    const res = await weatherService.getHealth();
    setHealthStatus(res);
    setLoadingHealth(false);
  };

  useEffect(() => {
    if (isOpen) fetchHealth();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card animate-fade" style={{
        maxWidth: '920px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        background: '#090d16',
        border: '1px solid var(--accent-blue-500)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Cpu size={24} color="#3b82f6" />
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800 }}>
                MERN Architecture & API Inspector
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Internship Evaluator Panel — Real-time Backend & Data Flow Diagnostics
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Live Server Health Status */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Server size={16} color="#10b981" /> Express.js Server Health Status
            </span>
            <button className="btn btn-secondary" onClick={fetchHealth} style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}>
              <RefreshCw size={12} className={loadingHealth ? 'spinSlow' : ''} /> Refresh Status
            </button>
          </div>

          {healthStatus ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>API Server: </span>
                <strong style={{ color: healthStatus.status === 'online' ? '#10b981' : '#ef4444' }}>
                  {healthStatus.status?.toUpperCase() || 'OFFLINE'}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Database: </span>
                <strong style={{ color: healthStatus.database?.includes('MongoDB') ? '#10b981' : '#f59e0b' }}>
                  {healthStatus.database || 'Fallback'}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>OpenWeather Key: </span>
                <strong style={{ color: healthStatus.openWeatherKeyConfigured ? '#10b981' : '#60a5fa' }}>
                  {healthStatus.openWeatherKeyConfigured ? 'Live Key' : 'Demo Payload'}
                </strong>
              </div>
            </div>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Checking server status...</span>
          )}
        </div>

        {/* Architecture Data Flow Diagram per PDF specs */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#93c5fd', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Code size={16} /> MERN Data Flow Lifecycle
          </h4>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            background: '#040711',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            color: '#38bdf8',
            lineHeight: 1.6,
            overflowX: 'auto'
          }}>
            [1] React Client (SearchBar) ➔ GET /api/weather?city=Name<br />
            [2] Express Backend Routes (routes/weatherRoutes.js)<br />
            [3] Weather Controller ➔ Geocoding & OpenWeather API Call<br />
            [4] Backend Transformation Service ➔ Sanitize Clean Schema<br />
            [5] MongoDB Persist ➔ Save to SearchHistory Collection<br />
            [6] HTTP 200 OK ➔ React State Update & Dynamic Glass UI Render
          </div>
        </div>

        {/* Live API Response JSON Payload Inspector */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Database size={16} color="#f59e0b" /> Transformed API Payload Inspector
          </h4>
          <pre style={{
            background: '#040711',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontSize: '0.76rem',
            color: '#a7f3d0',
            maxHeight: '220px',
            overflowY: 'auto',
            fontFamily: 'monospace'
          }}>
            {JSON.stringify(currentPayload || { message: 'No payload loaded' }, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureInspector;
