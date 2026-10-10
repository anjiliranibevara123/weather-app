import React from 'react';
import { Bookmark, X, Trash2, MapPin, ExternalLink } from 'lucide-react';

const FavoritesDrawer = ({ isOpen, onClose, favorites = [], onSelectCity, onRemoveFavorite }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="glass-card animate-fade" style={{
        maxWidth: '420px',
        width: '100%',
        height: '100vh',
        borderRadius: 0,
        borderLeft: '1px solid var(--border-glow)',
        background: '#0f172a',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bookmark size={20} color="#f59e0b" fill="#f59e0b" />
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>
              MongoDB Favorites
            </h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Favorite Cities List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Bookmark size={40} color="var(--border-light)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.9rem' }}>No favorite cities saved yet.</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                Click the bookmark icon on any city card to save it to your MongoDB database.
              </p>
            </div>
          ) : (
            favorites.map((fav, idx) => (
              <div
                key={fav._id || idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue-500)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
              >
                <div
                  onClick={() => {
                    onSelectCity(fav.city);
                    onClose();
                  }}
                  style={{ cursor: 'pointer', flex: 1 }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={15} color="#60a5fa" />
                    {fav.city}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {fav.country || 'Saved Location'}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFavorite(fav.city)}
                  title="Remove from MongoDB database"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesDrawer;
