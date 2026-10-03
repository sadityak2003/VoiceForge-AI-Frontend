export interface VoiceSettings {
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
  speed?: number;
}

export interface GenerateVoiceRequest {
  text: string;
  voiceId: string;
  modelId?: string;
  outputFormat?: string;
  languageCode?: string;
  voiceSettings?: VoiceSettings;
  seed?: number;
  previousText?: string;
  nextText?: string;
  applyTextNormalization?: string;
  applyLanguageTextNormalization?: boolean;
  usePvcAsIvc?: boolean;
}

export interface GenerateVoiceResponse {
  message: string;
  audioUrl: string;
}