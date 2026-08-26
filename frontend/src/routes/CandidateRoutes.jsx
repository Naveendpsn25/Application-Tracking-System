import { Routes, Route } from "react-router-dom";

import RoleRoute from "./RoleRoute";

import CandidateLayout
    from "../pages/Candidate/CandidateLayout/CandidateLayout";

import CandidateDashboard
    from "../pages/Candidate/CandidateDashboard";

import CandidateProfile
    from "../pages/Candidate/Profile/CandidateProfile";

function CandidateRoutes() {
    return (
        <Routes>
            <Route
                element={
                    <RoleRoute
                        allowedRole="CANDIDATE"
                    />
                }
            >
                <Route element={<CandidateLayout />}>
                    <Route
                        index
                        element={<CandidateDashboard />}
                    />
                </Route>

                <Route element={<CandidateLayout />}>
                    <Route
                        path="profile"
                        element={<CandidateProfile />}
                    />
                </Route>


            </Route>
        </Routes>
    );
}

export default CandidateRoutes;