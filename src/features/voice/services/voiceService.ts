import api from "../../../shared/services/api";

import type {
    GenerateVoiceRequest,
    GenerateVoiceResponse,
} from "../types/voice";

export const generateVoice = async (
    request: GenerateVoiceRequest
): Promise<GenerateVoiceResponse> => {
    const response = await api.post<GenerateVoiceResponse>(
        "/voice/generate",
        request
    );

    return response.data;
}