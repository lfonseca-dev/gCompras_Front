import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null;
    }

    if (user) {
        const redirectTo = location.state?.from?.pathname || "/dashboard";
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}