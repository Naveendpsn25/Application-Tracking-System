import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth/authStore";

function RoleRoute({ allowedRole }) {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        switch (user.role) {
            case "SUPER_ADMIN":
                return <Navigate to="/admin" replace />;

            case "RECRUITER":
                return user.is_approved ? (
                    <Navigate
                        to="/recruiter"
                        replace
                    />
                ) : (
                    <Navigate
                        to="/recruiter/pending"
                        replace
                    />
                );

            case "CANDIDATE":
                return <Navigate to="/candidate" replace />;

            default:
                return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
}

export default RoleRoute;