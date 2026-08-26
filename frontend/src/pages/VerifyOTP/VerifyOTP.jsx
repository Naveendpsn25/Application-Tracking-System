import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    verifyOTP,
    resendOTP,
} from "../../services/auth/otpService";

import VerifyOTPForm from "../../components/VerifyOTPForm/VerifyOTPForm";

function VerifyOTP() {
    const location = useLocation();
    const navigate = useNavigate();

    const { email, expires_at } = location.state || {};

    // -----------------------------------------
    // State
    // -----------------------------------------

    const [expiresAt, setExpiresAt] = useState(
        expires_at || null
    );

    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // -----------------------------------------
    // Protect OTP page
    // -----------------------------------------

    useEffect(() => {
        if (!email || !expiresAt) {
            navigate("/register", {
                replace: true,
            });
        }
    }, [email, expiresAt, navigate]);

    // -----------------------------------------
    // Countdown
    // -----------------------------------------

    useEffect(() => {
        if (!expiresAt) {
            return;
        }

        const calculateTimeLeft = () => {
            const expiryTime = new Date(
                expiresAt
            ).getTime();

            const currentTime = Date.now();

            const remaining = Math.max(
                0,
                Math.floor(
                    (expiryTime - currentTime) / 1000
                )
            );

            setTimeLeft(remaining);
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(
            calculateTimeLeft,
            1000
        );

        // Cleanup timer
        return () => clearInterval(timer);
    }, [expiresAt]);

    // -----------------------------------------
    // OTP input
    // -----------------------------------------

    const handleOtpChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, "")
            .slice(0, 6);

        setOtp(value);
        setError("");
    };

    // -----------------------------------------
    // Verify OTP
    // -----------------------------------------

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate OTP length
        if (otp.length !== 6) {
            setError(
                "Please enter the 6-digit OTP."
            );
            return;
        }

        // Check expiry
        if (timeLeft <= 0) {
            setError(
                "OTP has expired. Please request a new OTP."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const result = await verifyOTP({
                email,
                otp,
            });

            console.log(
                "OTP verification successful:",
                result
            );

            setSuccess(
                "Email verified successfully!"
            );

            // Move to login page
            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 1000);

        } catch (error) {
            console.error(
                "OTP verification failed:",
                error
            );

            setError(
                error.message ||
                "Invalid OTP. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // Resend OTP
    // -----------------------------------------

    const handleResend = async () => {
        if (!email) {
            setError(
                "Email address is missing."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const result = await resendOTP(email);

            console.log(
                "OTP resent successfully:",
                result
            );

            // ---------------------------------
            // Get NEW expiry time from backend
            // ---------------------------------

            const newExpiry =
                result.data.expires_at;

            // ---------------------------------
            // Update expiry state
            // This automatically restarts
            // the countdown useEffect
            // ---------------------------------

            setExpiresAt(newExpiry);

            // Clear previous OTP
            setOtp("");

            // Show success message
            setSuccess(
                "A new OTP has been sent to your email."
            );

        } catch (error) {
            console.error(
                "Resend OTP failed:",
                error
            );

            setError(
                error.message ||
                "Failed to resend OTP."
            );

        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // Render
    // -----------------------------------------

    return (
        <VerifyOTPForm
            email={email}
            otp={otp}
            timeLeft={timeLeft}
            loading={loading}
            error={error}
            success={success}
            onOtpChange={handleOtpChange}
            onSubmit={handleSubmit}
            onResend={handleResend}
        />
    );
}

export default VerifyOTP;