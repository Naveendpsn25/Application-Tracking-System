import { fetchWithAuth } from "../apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// GET Online Presence
export const getOnlinePresence = async () => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/online-presence/`,
        {
            method: "GET",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to load online presence."
        );
    }

    return result;
};


// UPDATE Online Presence
export const updateOnlinePresence = async (onlineData) => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/online-presence/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(onlineData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to update online presence."
        );
    }

    return result;
};

export const deleteOnlinePresence = async () => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/online-presence/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                linkedin_url: "",
                github_url: "",
                portfolio_url: "",
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to delete online presence."
        );
    }

    return result;
};