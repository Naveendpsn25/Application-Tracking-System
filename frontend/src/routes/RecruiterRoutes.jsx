import { Routes, Route } from "react-router-dom";

import RoleRoute from "./RoleRoute";
import RecruiterApprovalRoute from "./RecruiterApprovalRoute";

import RecruiterDashboard
    from "../pages/Recruiter/RecruiterDashboard";

import PendingApproval
    from "../pages/Recruiter/PendingApproval/PendingApproval";

import RecruiterLayout
    from "../components/Recruiter/Layout/RecruiterLayout/RecruiterLayout";

import Jobs from "../pages/Recruiter/Jobs/Jobs";

import CreateJob from "../pages/Recruiter/Jobs/CreateJob/CreateJob";

import JobDetails from "../components/Recruiter/Jobs/JobDetails/JobDetails";

import EditJob from "../pages/Recruiter/Jobs/EditJob/EditJob";

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
                        element={
                            <RecruiterLayout />
                        }
                    >
                        <Route index element={<RecruiterDashboard />}/>

                        <Route path="jobs" element={<Jobs />}/>

                        <Route path="jobs/create" element={<CreateJob />}/>

                        <Route path="jobs/details" element={<JobDetails />} />

                        <Route path="jobs/edit/:jobId"  element={<EditJob />}/>

                    </Route>
                </Route>

            </Route>

        </Routes>
    );
}


export default RecruiterRoutes;