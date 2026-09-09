import { API_BASE_URL } from "../../utils/constants";
import { fetchWithAuth } from "../apiClient";

const jobService = {
    createJob: async ({ jobData, action }) => {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/jobs/create/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...jobData,
                    action,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.message ||
                data?.errors?.detail ||
                JSON.stringify(data?.errors) ||
                "Failed to create job."
            );
        }
        return data;
    },

    getJobs: async () => {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/jobs/`,
            {
                method: "GET",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.message ||
                data?.errors?.detail ||
                JSON.stringify(data?.errors) ||
                "Failed to fetch jobs."
            );
        }

        return data;
    },
};

export default jobService;


