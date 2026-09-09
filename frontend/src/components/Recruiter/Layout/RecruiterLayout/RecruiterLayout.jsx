import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./RecruiterLayout.css";
import RecruiterSidebar from "./../RecruiterSidebar/RecruiterSidebar";
import RecruiterTopbar from "../RecruiterTopbar/RecruiterTopbar";

function RecruiterLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="recruiter-layout">
            <aside className="recruiter-layout-sidebar">
                <RecruiterSidebar open={sidebarOpen} />
            </aside>

            <div className="recruiter-layout-main">
                <header className="recruiter-layout-topbar">
                    <RecruiterTopbar
                        onMenuClick={() => setSidebarOpen((prev) => !prev)}
                    />
                </header>

                <main className="recruiter-layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default RecruiterLayout;