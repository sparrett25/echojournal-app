
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import VoiceEntry from './VoiceEntry';
import '../../styles/components/VoiceJournalLedger.css';
import '../../styles/button-harmony.css';

const fetchVoiceJournalEntries = async () => {
  const { data, error } = await supabase
    .from('voice_reflections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching voice journal entries:', error);
    return [];
  }

  return data;
};

const VoiceJournalLedger = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadEntries = async () => {
      const fetched = await fetchVoiceJournalEntries();
      setEntries(fetched);
    };

    loadEntries();
  }, []);

  return (
    <div className="ledger-container">
      <h2 className="ledger-header">Voice Journal Ledger</h2>
      <p className="entry-count">{entries.length} reflections recorded</p>
      <div className="ledger-scroll-area">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <VoiceEntry key={entry.id} entry={entry} />
          ))
        ) : (
          <p className="no-entries-message">No entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default VoiceJournalLedger;
