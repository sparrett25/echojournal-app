import { supabase } from '../lib/supabaseClient';

export const saveVoiceReflection = async ({
  transcript,
  inferredTone,
  toneTag,
  contextMode,
  semanticTags,
  breathState,
  soryaReflection,
  audioUrl,
}) => {
  const { error } = await supabase.from('voice_reflections').insert([
    {
      transcript,
      inferred_tone: inferredTone,
      tone_tag: toneTag,
      context_mode: contextMode,
      semantic_tags: semanticTags,
      breath_state: breathState,
      sorya_reflection: soryaReflection,
      audio_url: audioUrl,
    },
  ]);

  if (error) {
    console.error('Error saving voice reflection:', error);
    throw error;
  }
};
