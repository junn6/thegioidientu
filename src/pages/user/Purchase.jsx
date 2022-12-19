// Import library
import React from "react";

// Import components
import { useAuth } from "../../contexts";
import { useGetCollection } from "../../hooks";
import { Loading } from "../../components";
import { timestampToDate } from "../../utils";

const Purchase = () => {
    // ? Get data in custom hook
    const { currentUser } = useAuth();
    const [loading, orders] = useGetCollection({
        collectionName: "order",
        collectionCondition: {
            field: "uid",
            condition: "==",
            data: currentUser.uid,
        },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="purchase flow">
            <div className="section-heading">Lịch sử mua hàng</div>
            <div className="d-grid purchase-list">
                {orders.map((order, index) => (
                    <div className="purchase-card flow" key={order.id}>
                        <div className="d-flex justify-between items-center">
                            <div className="fw-semibold">{`Đơn hàng: ${
                                index + 1
                            }`}</div>
                            <time className="purchase-card-time">
                                {`Ngày đặt hàng: ${timestampToDate(
                                    order.createdAt.timestamp.seconds * 1000
                                )}`}
                            </time>
                        </div>
                        <div className="ff-secondary fw-medium">
                            Danh sách sản phẩm trong đơn hàng:
                        </div>
                        {order.products.map((product) => (
                            <div
                                className="purchase-card-item d-flex"
                                key={product.id}
                            >
                                <div className="purchase-card-img">
                                    <img
                                        className="img-fluid"
                                        src={product.photoURL}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="purchase-card-info">
                                    <div className="purchase-card-name">
                                        {product.name}
                                    </div>
                                    <p className="fs-200">
                                        Loại sản phẩm {product.sku.type}
                                    </p>
                                    <p className="fs-200">
                                        Số lượng {product.sku.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Purchase;
