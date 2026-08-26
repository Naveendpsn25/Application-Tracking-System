import { fetchWithAuth } from "../apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// ======================================================
// GET ALL CANDIDATE SKILLS
// ======================================================

export const getCandidateSkills = async () => {

    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/skills/`,
        {
            method: "GET",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to load skills."
        );
    }

    return result;
};


// ======================================================
// ADD CANDIDATE SKILL
// ======================================================

export const addCandidateSkill = async (skillData) => {

    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/skills/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(skillData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to add skill."
        );
    }

    return result;
};


// ======================================================
// UPDATE CANDIDATE SKILL
// ======================================================

export const updateCandidateSkill = async (
    skillId,
    skillData
) => {

    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/skills/${skillId}/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(skillData),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to update skill."
        );
    }

    return result;
};


// ======================================================
// DELETE CANDIDATE SKILL
// ======================================================

export const deleteCandidateSkill = async (skillId) => {

    const response = await fetchWithAuth(
        `${API_BASE_URL}/candidate/profile/skills/${skillId}/`,
        {
            method: "DELETE",
        }
    );

    // DELETE may return 204 No Content
    if (response.status === 204) {
        return true;
    }

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.detail ||
            result.message ||
            "Failed to delete skill."
        );
    }

    return result;
};