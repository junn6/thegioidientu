// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { useAuth } from "../contexts";

const PrivateRoutes = () => {
    const { currentUser } = useAuth();

    return !!currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
