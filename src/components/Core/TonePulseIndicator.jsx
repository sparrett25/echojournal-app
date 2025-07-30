// TonePulseIndicator.jsx
import React from 'react';
import '../../styles/components/tone-pulse-indicator.css';

const toneGlyphs = {
  Joyful: '✨',
  Calm: '🌿',
  Reflective: '💧',
  Intense: '🔥',
  Default: '𓂀',
};

const toneColors = {
  Joyful: '#ffe066',
  Calm: '#6ee7b7',
  Reflective: '#60a5fa',
  Intense: '#f87171',
  Default: '#cfcfcf',
};

export default function TonePulseIndicator({ tone = 'Default' }) {
  const glyph = toneGlyphs[tone] || toneGlyphs['Default'];
  const color = toneColors[tone] || toneColors['Default'];

  return (
    <div className="tone-pulse-container">
      <div className="tone-glow" style={{ borderColor: color, boxShadow: `0 0 15px ${color}` }}>
        <span className="tone-glyph">{glyph}</span>
      </div>
      <p className="tone-label">{tone}</p>
    </div>
  );
}
