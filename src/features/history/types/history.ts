export interface Generation {
    id: string;
    text: string;
    voiceId: string;
    audioUrl: string;
    creditsUsed: number;
    createdAt: string;
}

export interface SaveGenerationRequest {
    userEmail: string;
    text: string;
    voiceId: string;
    audioUrl: string;
    creditsUsed: number;
}