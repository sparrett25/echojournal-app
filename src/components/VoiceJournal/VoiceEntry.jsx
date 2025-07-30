import React from 'react';
import '../../styles/VoiceEntry.css';

const VoiceEntry = ({ entry }) => {
  const {
    transcript,
    tone_tag,
    breath_state,
    context_mode,
    created_at
  } = entry;

  return (
    <div className="voice-entry voice-entry-card">
      <p className="entry-transcript">{transcript}</p>

      <div className="entry-meta">
        {tone_tag && (
          <span className="tone-tag">
            🎼 Tone: <strong>{tone_tag}</strong>
          </span>
        )}
        {breath_state && (
          <span className="breath-state">
            🌬️ Breath: <em>{breath_state}</em>
          </span>
        )}
        {context_mode && (
          <span className="context-mode">
            🧭 Context: {context_mode}
          </span>
        )}
        {created_at && (
          <span className="entry-date">
            📅 {new Date(created_at).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default VoiceEntry;
