// Import library
import { Outlet, Navigate } from "react-router-dom";

// Import components
import { useAuth } from "../contexts";

const AuthRoutes = () => {
    const { currentUser } = useAuth();

    return !!currentUser ? (
        <Navigate to="/" />
    ) : (
        <main
            style={{ minHeight: "100vh" }}
            className="d-flex justify-center items-center"
        >
            <Outlet />
        </main>
    );
};

export default AuthRoutes;
