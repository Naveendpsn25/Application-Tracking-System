import { create } from "zustand";

const ACCESS_TOKEN_KEY = "talentbridge_access_token";
const REFRESH_TOKEN_KEY = "talentbridge_refresh_token";
const USER_KEY = "talentbridge_user";

const getStoredValue = (key) => {
    return (
        localStorage.getItem(key) ||
        sessionStorage.getItem(key)
    );
};

const useAuthStore = create((set) => ({
    accessToken: getStoredValue(ACCESS_TOKEN_KEY),

    refreshToken: getStoredValue(REFRESH_TOKEN_KEY),

    user: JSON.parse(
        getStoredValue(USER_KEY) || "null"
    ),

    login: ({
        access,
        refresh,
        user,
        rememberMe,
    }) => {
        // Clear old authentication data
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);

        const storage = rememberMe
            ? localStorage
            : sessionStorage;

        storage.setItem(
            ACCESS_TOKEN_KEY,
            access
        );

        storage.setItem(
            REFRESH_TOKEN_KEY,
            refresh
        );

        storage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );

        set({
            accessToken: access,
            refreshToken: refresh,
            user,
        });
    },

    // NEW
    updateTokens: ({
        access,
        refresh,
    }) => {
        /*
         * Determine where the current refresh token
         * is stored so we update the same storage.
         */
        const storage = localStorage.getItem(
            REFRESH_TOKEN_KEY
        )
            ? localStorage
            : sessionStorage;

        if (access) {
            storage.setItem(
                ACCESS_TOKEN_KEY,
                access
            );
        }

        if (refresh) {
            storage.setItem(
                REFRESH_TOKEN_KEY,
                refresh
            );
        }

        set((state) => ({
            accessToken: access || state.accessToken,
            refreshToken: refresh || state.refreshToken,
        }));
    },

    logout: () => {
        localStorage.removeItem(
            ACCESS_TOKEN_KEY
        );

        localStorage.removeItem(
            REFRESH_TOKEN_KEY
        );

        localStorage.removeItem(USER_KEY);

        sessionStorage.removeItem(
            ACCESS_TOKEN_KEY
        );

        sessionStorage.removeItem(
            REFRESH_TOKEN_KEY
        );

        sessionStorage.removeItem(USER_KEY);

        set({
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    },
}));

export default useAuthStore;