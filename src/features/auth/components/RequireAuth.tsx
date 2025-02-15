import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Protect routes by requiring authentication
export const RequireAuth = () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    console.log(token);
    // Get the current location
    const location = useLocation();

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Render the protected route
    return <Outlet />;
};
