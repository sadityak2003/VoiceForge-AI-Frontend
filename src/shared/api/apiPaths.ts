export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
    },

    USER: {
        PROFILE: "/api/user/profile",
    },

    VOICE: {
        GENERATE: "/api/voice/generate",
    },

    HISTORY: {
        LIST: "/api/history/list",
    },
} as const;