import { useEffect } from "react";
import useAuthStore from "../../../store/auth/authStore";

const SESSION_TIMEOUT = 3 * 60 * 60 * 1000; // 3 hours

// const SESSION_TIMEOUT = 60 * 1000; // 1 minute  

function AuthSessionManager() {
    const {
        accessToken,
        logout,
    } = useAuthStore();

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        let timeoutId;

        const handleLogout = () => {
            logout();
            window.location.href = "/login";
        };

        const resetTimer = () => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                handleLogout();
            }, SESSION_TIMEOUT);
        };

        const events = [
            "mousemove",
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
        ];

        events.forEach((event) => {
            window.addEventListener(
                event,
                resetTimer
            );
        });

        // Start the timer immediately
        resetTimer();

        return () => {
            clearTimeout(timeoutId);

            events.forEach((event) => {
                window.removeEventListener(
                    event,
                    resetTimer
                );
            });
        };
    }, [accessToken, logout]);

    return null;
}

export default AuthSessionManager;