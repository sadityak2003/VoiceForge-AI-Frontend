import api from "@/shared/services/api";
import type { UpdateProfileRequest, User } from "../types/user";

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<User>(
        "/users/profile"
    );

    return response.data;
};

export const updateUser = async (
    request: UpdateProfileRequest
): Promise<User> => {
    const response = await api.put<User> (
        "/users/profile",
        request
    );

    return response.data;
};
