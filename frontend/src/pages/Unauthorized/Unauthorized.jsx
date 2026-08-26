import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/auth/authStore";

import "./Unauthorized.css";


function Unauthorized() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleReturn = () => {
        switch (user?.role) {
            case "SUPER_ADMIN":
                navigate("/admin", { replace: true });
                break;

            case "RECRUITER":
                if (user?.is_approved) {
                    navigate("/recruiter", {
                        replace: true,
                    });
                } else {
                    navigate("/recruiter/pending", {
                        replace: true,
                    });
                }
                break;

            case "CANDIDATE":
                navigate("/candidate", {
                    replace: true,
                });
                break;

            default:
                navigate("/login", {
                    replace: true,
                });
        }
    };


    const handleLogout = () => {
        logout();

        navigate("/login", {
            replace: true,
        });
    };


    return (
        <main className="unauthorized-page">

            {/* Header */}
            <header className="unauthorized-header">

                <div className="unauthorized-brand">

                    <div className="unauthorized-brand-mark">
                        TB
                    </div>

                    <div>
                        <h2>TalentBridge</h2>

                        <span>
                            Applicant Tracking System
                        </span>
                    </div>

                </div>


                {user && (
                    <div className="unauthorized-user">

                        <span>
                            {user.role
                                ?.replace("_", " ")
                                .toLowerCase()
                                .replace(/\b\w/g, (letter) =>
                                    letter.toUpperCase()
                                )}
                        </span>

                        <button
                            type="button"
                            onClick={handleLogout}
                        >
                            Sign out
                        </button>

                    </div>
                )}

            </header>


            {/* Main */}
            <section className="unauthorized-content">

                <div className="unauthorized-icon">
                    <span>!</span>
                </div>


                <p className="unauthorized-eyebrow">
                    ACCESS RESTRICTED
                </p>


                <h1>
                    You don't have permission
                    <br />
                    to access this page
                </h1>


                <p className="unauthorized-description">
                    This area of TalentBridge is restricted to
                    users with the appropriate access level.
                    Your account is authenticated, but your
                    current role does not have permission to
                    view this resource.
                </p>


                {/* Current access information */}
                <div className="unauthorized-status">

                    <div className="unauthorized-status-indicator">
                        <span />
                    </div>

                    <div className="unauthorized-status-content">

                        <span>
                            CURRENT ACCOUNT
                        </span>

                        <strong>
                            {user?.email || "Authenticated user"}
                        </strong>

                    </div>


                    <div className="unauthorized-role">

                        <span>
                            ROLE
                        </span>

                        <strong>
                            {user?.role
                                ?.replace("_", " ")
                                .toLowerCase()
                                .replace(/\b\w/g, (letter) =>
                                    letter.toUpperCase()
                                ) ||
                                "Unknown"}
                        </strong>

                    </div>

                </div>


                {/* Explanation */}
                <div className="unauthorized-message">

                    <div className="unauthorized-message-icon">
                        i
                    </div>

                    <div>
                        <h3>
                            Why am I seeing this?
                        </h3>

                        <p>
                            TalentBridge protects different
                            areas of the application based on
                            user roles. You can only access
                            features assigned to your account.
                        </p>
                    </div>

                </div>


                {/* Actions */}
                <div className="unauthorized-actions">

                    <button
                        type="button"
                        className="unauthorized-primary"
                        onClick={handleReturn}
                    >
                        Return to my dashboard
                    </button>

                    <button
                        type="button"
                        className="unauthorized-secondary"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>

                </div>

            </section>


            {/* Footer */}
            <footer className="unauthorized-footer">

                <span>
                    TalentBridge ATS
                </span>

                <span>
                    Secure recruitment management platform
                </span>

            </footer>

        </main>
    );
}


export default Unauthorized;