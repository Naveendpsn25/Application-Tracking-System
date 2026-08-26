import { API_BASE_URL } from "../utils/constants";
import useAuthStore from "../store/auth/authStore";

export const fetchWithAuth = async (
    url,
    options = {}
) => {
    const {
        accessToken,
        refreshToken,
    } = useAuthStore.getState();

    // No authentication available
    if (!accessToken) {
        useAuthStore.getState().logout();
        window.location.href = "/login";

        throw new Error("Authentication required.");
    }

    // --------------------------------------------------
    // 1. Send request with current access token
    // --------------------------------------------------

    const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
    };

    let response = await fetch(url, {
        ...options,
        headers,
    });

    // --------------------------------------------------
    // 2. Request succeeded
    // --------------------------------------------------

    if (response.status !== 401) {
        return response;
    }

    // --------------------------------------------------
    // 3. Access token expired/invalid
    //    Try refresh token
    // --------------------------------------------------

    if (!refreshToken) {
        useAuthStore.getState().logout();
        window.location.href = "/login";

        throw new Error("Refresh token not available.");
    }

    try {
        const refreshResponse = await fetch(
            `${API_BASE_URL}/auth/token/refresh/`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    refresh: refreshToken,
                }),
            }
        );

        // --------------------------------------------------
        // 4. Refresh token expired/invalid
        // --------------------------------------------------

        if (!refreshResponse.ok) {
            useAuthStore.getState().logout();
            window.location.href = "/login";

            throw new Error(
                "Session expired. Please login again."
            );
        }

        const refreshData =
            await refreshResponse.json();

        // --------------------------------------------------
        // 5. Save new access token
        // --------------------------------------------------

        useAuthStore.getState().updateTokens({
            access: refreshData.access,
            refresh: refreshData.refresh,
        });

        // --------------------------------------------------
        // 6. Retry original request
        // --------------------------------------------------

        const retryHeaders = {
            ...(options.headers || {}),
            Authorization: `Bearer ${refreshData.access}`,
        };

        response = await fetch(url, {
            ...options,
            headers: retryHeaders,
        });

        return response;

    } catch (error) {
        // Make sure authentication is cleared
        // if refresh/retry fails.

        useAuthStore.getState().logout();

        window.location.href = "/login";

        throw error;
    }
};