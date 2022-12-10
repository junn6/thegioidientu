// Import library
import { Link } from "react-router-dom";

// Import icons
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

// Import components
import { Loading } from "../../../components";
import { useGetCollection } from "../../../hooks";
import { photoURLDefault } from "../../../constants";
import { deleteById, deleteObjStorage } from "../../../utils";

const Employee = () => {
    // ? Get data in custom hook
    const [loading, data, setReload] = useGetCollection({
        collectionName: "user",
        collectionCondition: { field: "role", condition: "==", data: 1 },
    });

    /**
     * ? Handle event function
     * * 1. Delete user method
     */
    const handleClick = async (user) => {
        // TODO Get user info
        const { id, photoURL } = user;
        // TODO Delete image file in storage if user have
        if (photoURL !== photoURLDefault) {
            await deleteObjStorage(photoURL);
        }
        // TODO Delete information in user collection firestore
        await deleteById("user", id);
        // TODO Update data table
        setReload(true);
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
                <h5>Quản lý nhân viên</h5>
                <Link
                    to="/employee/create"
                    className="button"
                    button-variant="contained"
                    button-color="green"
                >
                    thêm nhân viên
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
                        {/* Nếu chưa có dữ liệu nhân viên */}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={6}>Chưa có dữ liệu nhân viên!</td>
                            </tr>
                        )}
                        {/* Có dữ liệu nhân viên */}
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
                                    <td>{user.createdAt.format}</td>
                                    <td>
                                        <Link
                                            to={`/employee/edit/${user.id}`}
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

export default Employee;
