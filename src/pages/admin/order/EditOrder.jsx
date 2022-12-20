// Import library
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import components
import { Loading } from "../../../components";
import { findById, update } from "../../../utils";

const EditOrder = () => {
    // ? Get product id in url
    const { orderId } = useParams();

    // ? Set up states variables
    const [error, setError] = useState();
    const [order, setOrder] = useState();
    const [status, setStatus] = useState();

    // ? Navigate variable
    const navigate = useNavigate();

    /**
     * ? Handle event function
     * * 1. Handle click update button
     */
    const updateOrder = async () => {
        // TODO Check data is changed?
        if (status === order.status) {
            setError("Dữ liệu chưa thay đổi");
            return;
        }

        // TODO Update order status in firestore
        await update("order", order.id, {
            status: parseInt(status),
        });

        // TODO Navigate order manage page
        navigate("/order");
    };

    /**
     * ? Side effect
     * * 1. Get order
     */
    useEffect(() => {
        const getOrder = async () => {
            // TODO Get info order from API
            const snapshot = await findById("order", orderId);
            const { status } = snapshot.data();

            // TODO Set value in state
            setOrder({ id: snapshot.id, ...snapshot.data() });
            setStatus(status);
        };

        getOrder();
    }, [orderId]);

    if (!order) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Cập nhật trạng thái đơn hàng</h5>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "1rem 2rem",
                }}
            >
                <div className="d-flex justify--between">
                    <div>{`Mã đơn hàng: ${order.id}`}</div>
                    <p
                        className="text-neutral-200 fs-200"
                        style={{ fontWeight: "500" }}
                    >
                        {order.createdAt.format}
                    </p>
                </div>
                <div
                    className="fs-400"
                    style={{ fontWeight: "700", marginBlock: "1rem" }}
                >
                    Danh sách sản phẩm
                </div>
                <div className="d-grid">
                    {order.products.map((product) => (
                        <div className="d-flex" key={product.id}>
                            <div
                                style={{
                                    width: "min(30vw, 10rem)",
                                    aspectRatio: "1",
                                    flexShrink: "0",
                                }}
                            >
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    src={product.photoURL}
                                    alt={product.name}
                                />
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <div
                                    className="fs-400"
                                    style={{ fontWeight: "500" }}
                                >
                                    {product.name}
                                </div>
                                <p
                                    style={{
                                        marginBlock: "0.25rem",
                                        fontWeight: "300",
                                    }}
                                >
                                    {`Loại: ${product.sku.type}, số lượng: ${product.sku.quantity}`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text--right" style={{ marginTop: "1rem" }}>
                    <p>{`Tổng số tiền: ${order.total} VNĐ`}</p>
                </div>
                <div
                    className="fs-400"
                    style={{ fontWeight: "700", marginBlock: "1rem" }}
                >
                    Cập nhật trạng thái đơn hàng
                </div>
                <div className="d-flex justify--between items--center">
                    <div
                        className="d-flex items--center"
                        style={{ "--gap": "0.25rem" }}
                    >
                        <label style={{ fontWeight: "600" }} htmlFor="status">
                            Trạng thái:
                        </label>
                        <select
                            id="status"
                            className="form--select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            data-visible={order.status === 0}
                        >
                            <option value="0">Đang giao hàng</option>
                            <option value="1">Đã nhận hàng</option>
                        </select>
                    </div>
                    {order.status === 0 && (
                        <button
                            className="button"
                            button-variant="contained"
                            button-color="green"
                            onClick={updateOrder}
                        >
                            cập nhật
                        </button>
                    )}
                </div>
                {error && (
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "1rem",
                            color: "#ff3333",
                            fontWeight: 500,
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>
        </section>
    );
};

export default EditOrder;
