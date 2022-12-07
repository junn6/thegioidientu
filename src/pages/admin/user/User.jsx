// Import library
import { Link } from "react-router-dom";

// Import icons
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

// Import components
import { Loading } from "../../../components";
import { useGetCollection } from "../../../hooks";

const User = () => {
    // ? Get data in custom hook
    const [loading, data] = useGetCollection({
        collectionName: "products",
    });
    /**
     * ? Handle event function
     * * 1. Delete user method
     */
    const handleClick = async (user) => {
        console.log(user);
    };

    if (loading) {
        return (
            <section>
                <Loading />
            </section>
        );
    }
    return (
        <section className="flow">
            <div className="d-flex justify--between items--center">
                <h5>Quản lý khách hàng</h5>
                <Link
                    to="/add_user"
                    className="button"
                    button-variant="contained"
                    button-color="green"
                >
                    thêm khách hàng
                </Link>
            </div>
            <div style={{ width: "100%", overflowX: "scroll" }}>
                <table className="table" style={{ width: "max(100%, 60rem)" }}>
                    <thead className="table--head">
                        <tr>
                            <th></th>
                            <th>thông tin cơ bản</th>
                            <th>tên hiển thị</th>
                            <th>số điện thoại</th>
                            <th>ngày tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table--body">
                        {/* Nếu chưa có dữ liệu khách hàng */}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={6}>Chưa có dữ liệu khách hàng!</td>
                            </tr>
                        )}
                        {/* Có dữ liệu khách hàng */}
                        {data.length > 0 &&
                            data.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="d-flex">
                                            <img
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "100%",
                                                    objectFit: "cover",
                                                }}
                                                src={user.photoURL}
                                                alt={user.displayName}
                                            />
                                            <div>
                                                <div className="fs-400 text--capitalize">
                                                    {user.fullName}
                                                </div>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.displayName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <Link
                                            to={`/edit_user/${user.id}`}
                                            className="table--button"
                                            style={{
                                                marginRight: "0.25rem",
                                            }}
                                        >
                                            <FiEdit />
                                        </Link>
                                        <div
                                            className="table--button"
                                            onClick={() => handleClick(user)}
                                        >
                                            <RiDeleteBinLine />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default User;
