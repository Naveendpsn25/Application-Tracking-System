import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/auth/authStore";


function RecruiterApprovalRoute() {
    const { accessToken, user } = useAuthStore();

    /*
     * User is not authenticated.
     */
    if (!accessToken || !user) {
        return <Navigate to="/login" replace />;
    }

    /*
     * Only recruiters are allowed here.
     */
    if (user.role !== "RECRUITER") {
        switch (user.role) {
            case "SUPER_ADMIN":
                return <Navigate to="/admin" replace />;

            case "CANDIDATE":
                return <Navigate to="/candidate" replace />;

            default:
                return <Navigate to="/login" replace />;
        }
    }

    /*
     * Recruiter has not been approved
     * by the Super Admin yet.
     */
    if (!user.is_approved) {
        return <Navigate
            to="/recruiter/pending"
            replace
        />;
    }

    /*
     * Recruiter is approved.
     */
    return <Outlet />;
}


export default RecruiterApprovalRoute;