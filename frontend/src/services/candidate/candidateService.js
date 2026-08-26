import { fetchWithAuth } from "../apiClient";
import { API_BASE_URL } from "../../utils/constants";

export const getCandidateProfile = async () => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/`,
        {
            method: "GET",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.detail ||
            result?.message ||
            "Failed to load candidate profile."
        );
    }

    return result;
};

export const updateCandidateProfile = async (data) => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.detail ||
            result?.message ||
            "Failed to update candidate profile."
        );
    }

    return result;
};