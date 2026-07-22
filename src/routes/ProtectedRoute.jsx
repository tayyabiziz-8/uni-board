import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";

export default function ProtectedRoute({ allowedRoles }) {

    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}