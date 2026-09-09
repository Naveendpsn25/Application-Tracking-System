import useAuthStore from "../../../../store/auth/authStore";

import "./RecruiterTopbar.css";

function RecruiterTopbar({ onMenuClick }) {
    const user = useAuthStore((state) => state.user);

    const firstName =
        user?.first_name || "Recruiter";

    const lastName =
        user?.last_name || "";

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
        .toUpperCase()
        .trim();

    return (
        <header className="recruiter-topbar">
            <div className="recruiter-topbar-actions">

                <button
                    type="button"
                    className="recruiter-topbar-menu-button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                >
                    ☰
                </button>
                {/* Notifications */}
                <button
                    type="button"
                    className="recruiter-topbar-icon-button"
                    aria-label="Notifications"
                >
                    
                    <span className="recruiter-topbar-notification-icon">
                        🔔
                    </span>

                    <span className="recruiter-topbar-notification-dot" />
                </button>

                {/* Recruiter Avatar */}
                <div className="recruiter-topbar-avatar">
                    {initials || "R"}
                </div>
            </div>
        </header>
    );
}

export default RecruiterTopbar;