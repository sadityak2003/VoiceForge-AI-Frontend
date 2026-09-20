import { useEffect, useState } from "react";
import type { User, UpdateProfileRequest } from "../types/user";

import {
    getCurrentUser,
    updateUser,
} from "../services/userService";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCurrentUser();

            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setError("Failed to laod profile.");
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (
        request: UpdateProfileRequest
    ) => {
        try {
            setUpdating(true);
            setError(null);

            const updatedUser = await updateUser(request);

            setUser(updatedUser);

            return updateUser;
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError("Failed to update profile.");
            throw error;
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        user,
        loading,
        updating,
        error,
        fetchUser,
        updateProfile,
    };
};