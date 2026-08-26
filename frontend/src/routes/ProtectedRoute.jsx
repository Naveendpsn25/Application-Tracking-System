import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/auth/authStore";


function ProtectedRoute({ allowedRoles = [] }) {
    const { accessToken, user } = useAuthStore();

    /*
     * User is not logged in.
     */
    if (!accessToken || !user) {
        return <Navigate to="/login" replace />;
    }

    /*
     * User is logged in but has no valid role.
     */
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}


export default ProtectedRoute;