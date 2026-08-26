import { Routes, Route } from "react-router-dom";

import RoleRoute from "./RoleRoute";
import RecruiterApprovalRoute from "./RecruiterApprovalRoute";

import RecruiterDashboard
    from "../pages/Recruiter/RecruiterDashboard";

import PendingApproval
    from "../pages/Recruiter/PendingApproval/PendingApproval";


function RecruiterRoutes() {
    return (
        <Routes>

            {/* Recruiter role protection */}
            <Route
                element={
                    <RoleRoute
                        allowedRole="RECRUITER"
                    />
                }
            >

                {/* Pending approval page */}
                <Route
                    path="pending"
                    element={<PendingApproval />}
                />

                {/* Approved recruiter area */}
                <Route
                    element={
                        <RecruiterApprovalRoute />
                    }
                >

                    <Route
                        index
                        element={
                            <RecruiterDashboard />
                        }
                    />

                </Route>

            </Route>

        </Routes>
    );
}


export default RecruiterRoutes;