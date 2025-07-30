
import React, { useState } from 'react';
import VoiceEntry from './VoiceEntry';
import WhisperRecorder from './WhisperRecorder';
import { saveVoiceReflection } from '../../utils/saveVoiceJournalReflection.js';
import '../../styles/voiceJournal.css';


const VoiceJournal = () => {
  const [status, setStatus] = useState('Ready to record');

  const handleRecordingComplete = async (entry) => {
    setStatus('Saving...');
    try {
      await saveVoiceReflection(entry);
      setStatus('Saved to Supabase');
    } catch (error) {
      setStatus('Error saving');
    }
  };

  return (
    <div className="voice-journal-container">
      <h2 className="journal-header">Voice Journal</h2>
      <p className="journal-status">{status}</p>
      <div className="recorder-button-wrapper">
        <WhisperRecorder
          onComplete={handleRecordingComplete}
          className="primary-button"
        />
      </div>
    </div>
  );
};

export default VoiceJournal;
