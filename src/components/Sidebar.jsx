// Import library
import { Link, NavLink, useNavigate } from "react-router-dom";

// Import components
import { useAuth } from "../contexts";
import Logo from "../assets/logo/logo.png";

const Sidebar = () => {
    // ? Get method in custom hook
    const { signout } = useAuth();

    // ? Navigate variable
    const navigate = useNavigate();

    /**
     * ? Handle event function
     * * 1. Sign out method
     */
    const handleClick = () => {
        // Log out
        signout();
        // Navigate to welcome
        navigate("/welcome");
    };

    return (
        <aside className="sidebar d-flex direction-column">
            {/* Logo */}
            <Link to="/" style={{ paddingBlock: "2rem" }}>
                <img
                    style={{ width: "5rem" }}
                    src={Logo}
                    alt="Thegioidientu logo"
                />
            </Link>
            {/* Menu */}
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="/" end>
                        <span className="material-symbols-rounded">home</span>
                        trang chủ
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="/shop">
                        <span className="material-symbols-rounded">
                            local_mall
                        </span>
                        cửa hàng
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="/cart">
                        <span className="material-symbols-rounded">
                            shopping_cart
                        </span>
                        giỏ hàng
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="/profile">
                        <span className="material-symbols-rounded">
                            person_filled
                        </span>
                        cá nhân
                    </NavLink>
                </li>
            </ul>
            <div
                className="sidebar-button sidebar-link"
                to="/profile"
                onClick={handleClick}
            >
                <span className="material-symbols-rounded">logout</span>
                đăng xuất
            </div>
        </aside>
    );
};

export default Sidebar;
