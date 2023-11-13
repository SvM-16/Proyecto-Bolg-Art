import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () =>
{
    const { loading ,isAuthenticathed } = useAuth();
    if (loading) return <h1>Loading...</h1>;
    if (!loading && !isAuthenticathed) return <Navigate to='/login' replace />

    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default ProtectedRoute