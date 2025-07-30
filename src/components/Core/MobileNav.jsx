// MobileNav.jsx
import React, { useState } from 'react';
import '../../styles/components/mobile-nav.css';

export default function MobileNav({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('voicejournal');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  return (
    <nav className="mobile-nav">
      
      <button
        className={activeTab === 'voicejournal' ? 'nav-item active' : 'nav-item'}
        onClick={() => handleTabClick('voicejournal')}
      >
        🎙️ <span>Journal</span>
      </button>

      <button
        className={activeTab === 'voicejournalledger' ? 'nav-item active' : 'nav-item'}
        onClick={() => handleTabClick('voicejournalledger')}
      >
        📖 <span>Journal Ledger</span>
      </button>
    </nav>
  );
}
