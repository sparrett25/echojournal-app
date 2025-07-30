// src/components/VoiceJournal/WhisperRecorder.jsx

import React, { useState, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export default function WhisperRecorder({ onComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [status, setStatus] = useState('');

  const startRecording = async () => {
    setTranscript('');
    setStatus('🎙️ Recording...');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunksRef.current = [];

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);

      setStatus('⏳ Transcribing...');
      const transcriptText = await transcribeAudio(audioBlob);
      setTranscript(transcriptText);

      onComplete({ transcript: transcriptText, audioUrl });
      setStatus('✅ Saved');
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const transcribeAudio = async (audioBlob) => {
    const file = new File([audioBlob], 'voice-entry.webm', { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: formData,
    });

    const result = await response.json();
    return result.text || '(no transcription)';
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          backgroundColor: isRecording ? '#aa4444' : 'var(--accent-color)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isRecording ? '⏹ Stop Recording' : '🎤 Start Recording'}
      </button>

      {status && <p style={{ marginTop: '1rem', opacity: 0.8 }}>{status}</p>}
      {transcript && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Transcript:</strong>
          <p style={{ backgroundColor: '#1112', padding: '0.5rem', borderRadius: '6px' }}>
            {transcript}
          </p>
        </div>
      )}
    </div>
  );
}
