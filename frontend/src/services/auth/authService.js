import { API_BASE_URL } from "../../utils/constants";

export const register = async (data) => {
    const response = await fetch(
        `${API_BASE_URL}/auth/register/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        console.log(
            "Backend registration error:",
            result
        );

        const error = new Error(
            "Registration failed"
        );

        error.data = result;

        throw error;
    }

    return result;
};


export const loginUser = async ({
    email,
    password,
}) => {
    const response = await fetch(
        `${API_BASE_URL}/auth/login/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.errors?.detail ||
            data?.message ||
            "Login failed. Please check your credentials."
        );
    }

    return data;
};  