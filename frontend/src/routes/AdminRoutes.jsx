import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";


function AdminRoutes() {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["SUPER_ADMIN"]}
                    />
                }
            >
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Super Admin Dashboard</h1>
                        </div>
                    }
                />
            </Route>
        </Routes>
    );
}


export default AdminRoutes;