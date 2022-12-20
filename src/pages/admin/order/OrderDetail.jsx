// Import library
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import components
import { Loading } from "../../../components";
import { findById } from "../../../utils";

const OrderDetail = () => {
    // ? Get product id in url
    const { orderId } = useParams();

    // ? Set up states variables
    const [order, setOrder] = useState();

    /**
     * ? Side effect
     * * 1. Get order
     */
    useEffect(() => {
        const getOrder = async () => {
            // TODO Get info order from API
            const snapshot = await findById("order", orderId);

            // TODO Set value in state
            setOrder({ id: snapshot.id, ...snapshot.data() });
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
            <h5>Chi tiết đơn hàng</h5>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "1rem 2rem",
                }}
            >
                <div className="d-flex justify--between">
                    <div>
                        <div>{`Mã đơn hàng: ${order.id}`}</div>
                        {order.status === 0 && (
                            <p
                                className="d-inline-block fs-100"
                                style={{
                                    fontWeight: "500",
                                    padding: "0.5rem",
                                    backgroundColor: "var(--clr-primary-100)",
                                    color: "var(--clr-primary-500)",
                                }}
                            >
                                Đang giao hàng
                            </p>
                        )}
                        {order.status === 1 && (
                            <p
                                className="d-inline-block fs-100"
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "var(--clr-green-100)",
                                    color: "var(--clr-green-500)",
                                }}
                            >
                                Đã nhận hàng
                            </p>
                        )}
                    </div>
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
            </div>
        </section>
    );
};

export default OrderDetail;
