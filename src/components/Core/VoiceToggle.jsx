// VoiceToggle.jsx
import React, { useState, useEffect } from 'react';

export default function VoiceToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('soryaVoiceMuted');
    setIsMuted(stored === 'true');
  }, []);

  const toggleVoice = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem('soryaVoiceMuted', newState.toString());
  };

  return (
    <button
      className="voice-toggle-button"
      onClick={toggleVoice}
      title={isMuted ? "Unmute Sorya" : "Mute Sorya"}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
}
