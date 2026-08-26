import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import RecruiterRoutes from "./RecruiterRoutes";
import CandidateRoutes from "./CandidateRoutes";

import Unauthorized from "../pages/Unauthorized/Unauthorized";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route
                    path="/*"
                    element={<PublicRoutes />}
                />

                {/* Super Admin */}
                <Route
                    path="/admin/*"
                    element={<AdminRoutes />}
                />

                {/* Recruiter */}
                <Route
                    path="/recruiter/*"
                    element={<RecruiterRoutes />}
                />

                {/* Candidate */}
                <Route
                    path="/candidate/*"
                    element={<CandidateRoutes />}
                />

                {/* Unauthorized */}
                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes;