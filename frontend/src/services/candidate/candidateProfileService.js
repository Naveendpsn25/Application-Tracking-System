import { fetchWithAuth } from "../apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// ==================================================
// CANDIDATE PROFILE
// ==================================================

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
            result.detail ||
            result.message ||
            "Failed to load candidate profile."
        );
    }

    return result;
};


export const updateCandidateProfile = async (
    profileData
) => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(profileData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to update candidate profile."
        );
    }

    return result;
};


// ==================================================
// CANDIDATE EDUCATION
// ==================================================

export const getCandidateEducation = async () => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/education/`,
        {
            method: "GET",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to load education details."
        );
    }

    return result;
};


export const addCandidateEducation = async (
    educationData
) => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/education/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(educationData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to add education."
        );
    }

    return result;
};


export const updateCandidateEducation = async (
    educationId,
    educationData
) => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/education/${educationId}/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(educationData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to update education."
        );
    }

    return result;
};


export const deleteCandidateEducation = async (
    educationId
) => {
    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/education/${educationId}/`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const result = await response.json();

        throw new Error(
            result.detail ||
            result.message ||
            "Failed to delete education."
        );
    }

    return true;
};