import React from 'react';
import { Sparkles, Shirt, Activity, SunMedium, CloudRain, ShieldCheck } from 'lucide-react';

const SmartAdvisor = ({ current, location }) => {
  if (!current) return null;

  const temp = current.temperature;
  const condition = current.condition || '';
  const isRain = /rain|drizzle|thunder/i.test(condition);
  const isSnow = /snow/i.test(condition);

  // Smart Outfit Calculation
  let outfitText = '';
  if (temp < 5) outfitText = 'Heavy winter coat, thermal layers, scarf, and insulated boots.';
  else if (temp < 15) outfitText = 'Warm jacket, light sweater, trousers, and closed shoes.';
  else if (temp < 24) outfitText = 'Comfortable shirt/t-shirt, light jeans or chinos.';
  else outfitText = 'Lightweight breathable cotton clothes, shorts, and sunglasses.';

  if (isRain) outfitText += ' ☔ Bring a sturdy umbrella or waterproof jacket!';

  // Activity Index
  let activityScore = 'Optimal (9/10)';
  let activityAdvice = 'Great weather for outdoor workouts, walking, or sports!';
  if (isRain) {
    activityScore = 'Indoor Preferred (4/10)';
    activityAdvice = 'Rain expected. Ideal for gym, coffee shops, or indoor relaxation.';
  } else if (temp > 32) {
    activityScore = 'Caution (5/10)';
    activityAdvice = 'High heat. Avoid intense outdoor exertion during midday peak hours.';
  } else if (temp < 0) {
    activityScore = 'Cold Warning (5/10)';
    activityAdvice = 'Freezing temperature. Limit prolonged skin exposure outdoors.';
  }

  // Health Protection
  const uvText = current.uvIndex > 6 ? 'High UV - Apply SPF 50+ sunscreen and wear sunglasses.' : 'Moderate UV - Normal outdoor protection is fine.';

  return (
    <div
      className="glass-card animate-fade"
      style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.7) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={18} color="#10b981" />
        </div>
        <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
          AI Weather & Lifestyle Advisor
        </h3>
        <span style={{ fontSize: '0.7rem', background: '#10b98122', color: '#10b981', border: '1px solid #10b98144', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
          Unique Feature
        </span>
      </div>

      <div className="grid-3">
        {/* Outfit Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            <Shirt size={16} /> What to Wear Today
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
            {outfitText}
          </p>
        </div>

        {/* Activity Rating Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3b82f6', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            <Activity size={16} /> Outdoor Activity Index
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.2rem' }}>
            {activityScore}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {activityAdvice}
          </p>
        </div>

        {/* Health Advisory Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            <ShieldCheck size={16} /> UV & Health Advisory
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
            {uvText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartAdvisor;
