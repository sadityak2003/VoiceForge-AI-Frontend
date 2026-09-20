import api from "@/shared/services/api";

import type {
    Generation,
    SaveGenerationRequest,
} from "../types/history";

export const getHistory = async (
): Promise<Generation[]> => {
    const response = await api.get<Generation[]>(
        "/history"
    );

    return response.data;
};

export const saveGeneration = async (
    request: SaveGenerationRequest
): Promise<Generation> => {
    const response = await api.post<Generation>(
        "/history",
        request
    );

    return response.data;
};

export const deleteHistory = async (
    id: string
): Promise<void> => {
    await api.delete(
        `/history${id}`
    );
};