// Import library

// Import components
import { useAuth } from "../../contexts";

const PermissionDenied = () => {
    // ? Get method in useAuth hook
    const { signout } = useAuth();

    /**
     * ? Handle event function
     * * 1. Sign out method
     */
    const handleClick = async () => {
        await signout();
    };

    return (
        <div className="w-screen h-screen d-flex justify--center items--center">
            <div className="flow">
                <p
                    className="text--center"
                    style={{
                        color: "#ff3333",
                        fontWeight: 500,
                    }}
                >
                    Tài khoản không có quyền truy cập!
                </p>
                <button
                    className="button w-full text--center"
                    button-variant="contained"
                    button-color="primary"
                    onClick={handleClick}
                >
                    đăng xuất
                </button>
            </div>
        </div>
    );
};

export default PermissionDenied;
