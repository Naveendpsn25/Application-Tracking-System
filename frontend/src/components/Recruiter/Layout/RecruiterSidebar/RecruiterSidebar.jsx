import { NavLink, useNavigate } from "react-router-dom";

import useAuthStore from "../../../../store/auth/authStore";

import "./RecruiterSidebar.css";

function RecruiterSidebar({open}) {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const navigationSections = [
        {
            title: "Workspace",
            items: [
                {
                    label: "Dashboard",
                    path: "/recruiter",
                    icon: "▦",
                    end: true,
                },
                {
                    label: "Jobs",
                    path: "/recruiter/jobs",
                    icon: "▤",
                },
                {
                    label: "Candidates",
                    path: "/recruiter/candidates",
                    icon: "◉",
                },
                {
                    label: "Applications",
                    path: "/recruiter/applications",
                    icon: "▣",
                },
            ],
        },
        {
            title: "Hiring",
            items: [
                {
                    label: "Interviews",
                    path: "/recruiter/interviews",
                    icon: "◷",
                },
                {
                    label: "Offers",
                    path: "/recruiter/offers",
                    icon: "◇",
                },
            ],
        },
        {
            title: "Organization",
            items: [
                {
                    label: "Company",
                    path: "/recruiter/company",
                    icon: "▥",
                },
            ],
        },
        {
            title: "Insights",
            items: [
                {
                    label: "Analytics",
                    path: "/recruiter/analytics",
                    icon: "▥",
                },
                {
                    label: "Notifications",
                    path: "/recruiter/notifications",
                    icon: "●",
                },
            ],
        },
    ];

    return (
        <aside className={`recruiter-sidebar ${open ? "open" : ""}`}>
            {/* Brand */}
            <div className="recruiter-sidebar-brand">
                <div className="recruiter-sidebar-brand-mark">
                    TB
                </div>

                <div className="recruiter-sidebar-brand-text">
                    <h2>TalentBridge</h2>
                    <span>Recruiter Workspace</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="recruiter-sidebar-navigation">
                {navigationSections.map((section) => (
                    <div
                        className="recruiter-sidebar-section"
                        key={section.title}
                    >
                        <p className="recruiter-sidebar-section-title">
                            {section.title}
                        </p>

                        <div className="recruiter-sidebar-section-items">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `recruiter-sidebar-link ${
                                            isActive
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                >
                                    <span className="recruiter-sidebar-link-icon">
                                        {item.icon}
                                    </span>

                                    <span className="recruiter-sidebar-link-label">
                                        {item.label}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Bottom Area */}
            <div className="recruiter-sidebar-bottom">
                {/* Profile shortcut */}
                <NavLink
                    to="/recruiter/profile"
                    className={({ isActive }) =>
                        `recruiter-sidebar-profile ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <div className="recruiter-sidebar-avatar">
                        {user?.first_name
                            ?.charAt(0)
                            ?.toUpperCase() || "R"}
                    </div>

                    <div className="recruiter-sidebar-profile-info">
                        <strong>
                            {user?.first_name
                                ? `${user.first_name} ${
                                      user.last_name || ""
                                  }`
                                : "Recruiter"}
                        </strong>

                        <span>Recruiter</span>
                    </div>
                </NavLink>

                {/* Settings */}
                <NavLink
                    to="/recruiter/settings"
                    className={({ isActive }) =>
                        `recruiter-sidebar-link recruiter-sidebar-settings ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span className="recruiter-sidebar-link-icon">
                        ⚙
                    </span>

                    <span className="recruiter-sidebar-link-label">
                        Settings
                    </span>
                </NavLink>

                {/* Sign out */}
                <button
                    type="button"
                    className="recruiter-sidebar-logout"
                    onClick={handleLogout}
                >
                    <span className="recruiter-sidebar-link-icon">
                        ↪
                    </span>

                    <span className="recruiter-sidebar-link-label">
                        Sign out
                    </span>
                </button>
            </div>
        </aside>
    );
}

export default RecruiterSidebar;