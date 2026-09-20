import api  from "../../../shared/services/api";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth";

export const login = async (
    request: LoginRequest
) : Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>(
        "/auth/login",
        request
    );

    return response.data;
};

export const register = async (
    request: RegisterRequest
) : Promise<RegisterResponse> => {

    const response = await api.post<RegisterResponse>(
        "/auth/register",
        request
    );

    return response.data;
};