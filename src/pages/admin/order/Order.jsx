// Import library
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import icons
import { FiEdit } from "react-icons/fi";
import { RiFileInfoLine } from "react-icons/ri";

// Import components
import { Loading } from "../../../components";
import { useAuth } from "../../../contexts";
import { all, findById } from "../../../utils";

const Order = () => {
    // ? Get data in custom hook
    const { currentUser } = useAuth();

    // ? Set up state variables
    const [user, setUser] = useState();
    const [orders, setOrders] = useState();

    /**
     * ? Side Effect
     * * 1. Get user and order info
     */
    useEffect(() => {
        const getInfo = async () => {
            // TODO Get user and order data
            const userSnapshot = await findById("member", currentUser.uid);
            const ordersSnapshot = await all("order");

            // TODO Set state data
            setUser({ id: userSnapshot.id, ...userSnapshot.data() });
            const ordersRs = [];
            ordersSnapshot.forEach((doc) => {
                // TODO Format and push data in orderRs array
                ordersRs.push({ id: doc.id, ...doc.data() });
            });
            setOrders(ordersRs);
        };

        getInfo();
    }, [currentUser]);

    if (!user || !orders) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Thống kê đơn hàng</h5>
            <div style={{ width: "100%", overflowX: "scroll" }}>
                <table className="table" style={{ width: "max(100%, 60rem)" }}>
                    <thead className="table--head">
                        <tr>
                            <th>đơn hàng</th>
                            <th>khách hàng</th>
                            <th>sản phẩm</th>
                            <th>trạng thái</th>
                            <th>tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table--body">
                        {/* Nếu chưa có dữ liệu sản phẩm */}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6}>Chưa có dữ liệu đơn hàng!</td>
                            </tr>
                        )}
                        {/* Có dữ liệu sản phẩm */}
                        {orders.length > 0 &&
                            orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>
                                        <div style={{ fontWeight: "bold" }}>
                                            {order.id}
                                        </div>
                                        <p className="fs-200">
                                            {order.createdAt.format}
                                        </p>
                                    </td>
                                    <td>{order.fullName}</td>
                                    <td>
                                        <div
                                            className="d-flex"
                                            style={{ "--gap": "0" }}
                                        >
                                            {order.products.map(
                                                (product, index) => (
                                                    <img
                                                        style={{
                                                            width: "3rem",
                                                            aspectRatio: "1",
                                                            objectFit: "cover",
                                                            borderRadius: "50%",
                                                            marginLeft: `${
                                                                index > 0
                                                                    ? "-1.5rem"
                                                                    : ""
                                                            }`,
                                                        }}
                                                        key={product.id}
                                                        src={product.photoURL}
                                                        alt={product.name}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {order.status === 0 && (
                                            <p
                                                className="d-inline-block fs-200"
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    backgroundColor:
                                                        "var(--clr-primary-100)",
                                                    color: "var(--clr-primary-500)",
                                                }}
                                            >
                                                Đang giao hàng
                                            </p>
                                        )}
                                        {order.status === 1 && (
                                            <p
                                                className="d-inline-block fs-200"
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    backgroundColor:
                                                        "var(--clr-green-100)",
                                                    color: "var(--clr-green-500)",
                                                }}
                                            >
                                                Đã nhận hàng
                                            </p>
                                        )}
                                    </td>
                                    <td>{`${order.total} VNĐ`}</td>
                                    <td>
                                        <Link
                                            to={`/order/${order.id}`}
                                            className="table--button"
                                            style={{
                                                marginRight: "0.25rem",
                                            }}
                                        >
                                            <RiFileInfoLine />
                                        </Link>
                                        {user.role === 2 && (
                                            <Link
                                                to={`/order/edit/${order.id}`}
                                                className="table--button"
                                            >
                                                <FiEdit />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Order;
