// Import library
import { Link } from "react-router-dom";

// Import components
import { useAuth } from "../../contexts";
import { useGetCollection } from "../../hooks";
import { Loading } from "../../components";
import { timestampToDate } from "../../utils";

import emptyCard from "../../assets/illus/empty-cart.svg";

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
        <div className="purchase h-full d-flex direction-column">
            <div className="section-heading">Lịch sử mua hàng</div>
            <div className="d-grid purchase-list flex-grow-1">
                {orders.length === 0 && (
                    <div className="flex-grow-1 d-flex justify-center items-center">
                        <div
                            className="flow text-center"
                            style={{ "--flow-spacer": "1.5rem" }}
                        >
                            <p className="fw-medium">
                                Bạn chưa mua sản phẩm nào!
                            </p>
                            <img
                                style={{
                                    width: "min(100%, 16rem)",
                                    height: "auto",
                                    marginInline: "auto",
                                }}
                                src={emptyCard}
                                alt="Empty cart"
                            />
                            <Link
                                to="/shop"
                                className="button"
                                button-variant="contained"
                                button-color="primary"
                            >
                                tiếp tục mua hàng
                            </Link>
                        </div>
                    </div>
                )}
                {orders.length > 0 &&
                    orders.map((order, index) => (
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
