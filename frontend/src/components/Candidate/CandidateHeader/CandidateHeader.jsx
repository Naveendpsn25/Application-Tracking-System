import { NavLink } from "react-router-dom";
import useAuthStore from "../../../store/auth/authStore";

import "./CandidateHeader.css";

function CandidateHeader() {
    const { user, logout } = useAuthStore();

    const fullName = [user?.first_name, user?.last_name]
        .filter(Boolean)
        .join(" ");

    return (
        <header className="candidate-header">

            {/* Left - Brand */}
            <div className="candidate-header__brand">

                <div className="candidate-header__logo">
                    TB
                </div>

                <div className="candidate-header__brand-text">
                    <div className="candidate-header__title">
                        TalentBridge
                    </div>

                    <div className="candidate-header__subtitle">
                        Applicant Tracking System
                    </div>
                </div>

            </div>


            {/* Center - Navigation */}
            <nav className="candidate-header__nav">

                <NavLink
                    to="/candidate"
                    end
                    className={({ isActive }) =>
                        `candidate-header__link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/candidate/profile"
                    className={({ isActive }) =>
                        `candidate-header__link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    My Profile
                </NavLink>

                <NavLink
                    to="/candidate/jobs"
                    className={({ isActive }) =>
                        `candidate-header__link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    Jobs
                </NavLink>

                <NavLink
                    to="/candidate/applications"
                    className={({ isActive }) =>
                        `candidate-header__link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    My Applications
                </NavLink>

            </nav>


            {/* Right - User */}
            <div className="candidate-header__right">

                <div className="candidate-header__user">

                    <div className="candidate-header__user-name">
                        {fullName || user?.email}
                    </div>

                    <div className="candidate-header__user-role">
                        Candidate
                    </div>

                </div>

                <button
                    type="button"
                    className="candidate-header__logout"
                    onClick={logout}
                >
                    Sign out
                </button>

            </div>

        </header>
    );
}

export default CandidateHeader;