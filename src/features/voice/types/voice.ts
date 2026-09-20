export interface GenerateVoiceRequest {
    text: string;
    voiceId: string;
}

export interface GenerateVoiceResponse {
    message: string;
    audioUrl: string;
}