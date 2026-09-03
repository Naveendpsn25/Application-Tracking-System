import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/auth/authStore";

import "./PendingApproval.css";


function PendingApproval() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    // console.log("Recruiter user:", user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    if (user?.is_approved) {
        navigate("/recruiter/dashboard", { replace: true });
        return null;
    }

    return (
        <main className="pending-page">

            {/* Header */}
            <header className="pending-header">

                <div className="pending-brand">
                    <div className="pending-brand-mark">
                        TB
                    </div>

                    <div>
                        <h2>TalentBridge</h2>
                        <span>Applicant Tracking System</span>
                    </div>
                </div>

                <div className="pending-user">
                    <span>Recruiter</span>

                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>

            </header>


            {/* Main content */}
            <section className="pending-content">

                <div className="pending-status">

                    <div className="pending-status-icon">
                        <span>!</span>
                    </div>

                    <p className="pending-eyebrow">
                        ACCOUNT REVIEW
                    </p>

                    <h1>
                        Your recruiter account
                        <br />
                        is under review
                    </h1>

                    <p className="pending-description">
                        Welcome to TalentBridge
                        {user?.first_name
                            ? `, ${user.first_name}`
                            : ""}.
                        Your email has been verified successfully.
                        Your recruiter account is now waiting for
                        approval from a TalentBridge administrator.
                    </p>

                </div>


                {/* Status progress */}
                <div className="pending-progress">

                    <div className="pending-step completed">
                        <div className="pending-step-indicator">
                            ✓
                        </div>

                        <div>
                            <h3>Email verified</h3>
                            <p>
                                Your email address has been
                                successfully verified.
                            </p>
                        </div>
                    </div>


                    <div className="pending-progress-line" />


                    <div className="pending-step active">
                        <div className="pending-step-indicator">
                            •
                        </div>

                        <div>
                            <h3>Admin approval</h3>
                            <p>
                                Your recruiter account is currently
                                being reviewed.
                            </p>
                        </div>
                    </div>


                    <div className="pending-progress-line" />


                    <div className="pending-step upcoming">
                        <div className="pending-step-indicator">
                            3
                        </div>

                        <div>
                            <h3>Recruiter dashboard</h3>
                            <p>
                                Dashboard access will be available
                                after approval.
                            </p>
                        </div>
                    </div>

                </div>


                {/* Information */}
                <div className="pending-information">

                    <div className="pending-information-icon">
                        i
                    </div>

                    <div>
                        <h3>What happens next?</h3>

                        <p>
                            A TalentBridge administrator will review
                            your recruiter account and organization
                            details. Once your account is approved,
                            you will be able to access the recruiter
                            dashboard and start managing your
                            recruitment activities.
                        </p>
                    </div>

                </div>


                {/* Current status */}
                <div className="pending-footer">

                    <div className="pending-current-status">
                        <span className="pending-dot" />

                        <div>
                            <span>Current status</span>
                            <strong>
                                Pending administrator approval
                            </strong>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="pending-logout"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>

                </div>

            </section>


            {/* Footer */}
            <footer className="pending-page-footer">
                <span>TalentBridge ATS</span>
                <span>Secure recruitment management platform</span>
            </footer>

        </main>
    );
}


export default PendingApproval;