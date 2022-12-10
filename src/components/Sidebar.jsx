// Import library
import { Link, NavLink } from "react-router-dom";

// Import icons
import { BiHomeAlt } from "react-icons/bi";
import {
    HiOutlineUsers,
    HiOutlineUser,
    HiOutlineUserGroup,
} from "react-icons/hi";
import { MdLogout, MdOutlineShoppingCart } from "react-icons/md";
import { RiShoppingBag3Line } from "react-icons/ri";

// Import components
import { useAuth } from "../contexts";
import Logo from "../assets/logo/logo.png";

const Sidebar = ({ role }) => {
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
        <aside className="sidebar">
            <div className="sidebar--container">
                <Link
                    to="/"
                    className="sidebar--logo"
                    style={{ padding: "1rem" }}
                >
                    <img src={Logo} alt="Quản trị trang thegioidientu" />
                </Link>
                <ul className="sidebar--menu">
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/" end>
                            <BiHomeAlt />
                            <span>Trang chủ</span>
                        </NavLink>
                    </li>
                    {role === 0 && (
                        <li className="sidebar--item">
                            <NavLink className="sidebar--link" to="/employee">
                                <HiOutlineUserGroup />
                                <span>Nhân viên</span>
                            </NavLink>
                        </li>
                    )}
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/user">
                            <HiOutlineUsers />
                            <span>Người dùng</span>
                        </NavLink>
                    </li>
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/product">
                            <RiShoppingBag3Line />
                            <span>Sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/order">
                            <MdOutlineShoppingCart />
                            <span>Đơn hàng</span>
                        </NavLink>
                    </li>
                    {role === 1 && (
                        <li className="sidebar--item">
                            <NavLink className="sidebar--link" to="/profile">
                                <HiOutlineUser />
                                <span>Hồ sơ</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <button className="sidebar--button" onClick={handleClick}>
                    <MdLogout />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
