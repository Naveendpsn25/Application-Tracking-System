import { API_BASE_URL } from "../../utils/constants";

export const verifyOTP = async (data) => {
    const response = await fetch(
        `${API_BASE_URL}/auth/verify-otp/`,
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
        throw new Error(
            result.message ||
            result.errors?.otp?.[0] ||
            result.errors?.email?.[0] ||
            "OTP verification failed"
        );
    }

    return result;
};


export const resendOTP = async (email) => {
    const response = await fetch(
        `${API_BASE_URL}/auth/resend-otp/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            result.errors?.email?.[0] ||
            "Failed to resend OTP"
        );
    }

    return result;
};