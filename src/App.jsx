// App.jsx
import React, { useState } from 'react';
import MobileNav from './components/Core/MobileNav';

import VoiceJournal from './components/VoiceJournal/VoiceJournal';
import VoiceJournalLedger from './components/VoiceJournal/VoiceJournalLedger';
import './index.css';

export default function App() {
  const [activeView, setActiveView] = useState('whisper');

  const renderActiveView = () => {
    switch (activeView) {
      case 'voicejournal':
        return <VoiceJournal />;
      case 'voicejournalledger':
        return <VoiceJournalLedger />;
      default:
        return <VoiceJournal />;
    }
  };

  return (
    <div className="app-container">
      {renderActiveView()}
      <MobileNav onNavigate={setActiveView} />
    </div>
  );
}
